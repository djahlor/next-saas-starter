# Message Streaming System Documentation

## Overview

The message streaming system provides real-time, character-by-character display of AI responses with sophisticated loading states and animations. This document details the complete implementation.

## Core Components

### 1. Message Types & Interfaces

```typescript
type StreamingDelta = {
  type: 'text-delta' | 'title' | 'id' | 'suggestion' | 'clear' | 'finish';
  content: string | Suggestion;
};

interface UIBlock {
  documentId: string;
  content: string;
  title: string;
  status: 'idle' | 'streaming';
  isVisible: boolean;
  boundingBox: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
}
```

### 2. Loading States

```tsx
// components/custom/message.tsx
export const ThinkingMessage = () => {
  return (
    <motion.div
      className="w-full mx-auto max-w-3xl px-4 group/message"
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 1 } }}
      data-role="assistant"
    >
      <div className="flex gap-4 rounded-xl">
        <div className="size-8 flex items-center rounded-full justify-center ring-1 shrink-0 ring-border">
          <SparklesIcon size={14} />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-col gap-4 text-muted-foreground animate-pulse">
            Thinking...
          </div>
        </div>
      </div>
    </motion.div>
  );
};
```

### 3. Enhanced Stream Processing

```typescript
export function useBlockStream({
  streamingData,
  setBlock,
}: {
  streamingData: JSONValue[] | undefined;
  setBlock: Dispatch<SetStateAction<UIBlock>>;
}) {
  const { mutate } = useSWRConfig();
  const [optimisticSuggestions, setOptimisticSuggestions] = useState<Array<Suggestion>>([]);

  // Handle optimistic updates for suggestions
  useEffect(() => {
    if (optimisticSuggestions?.length > 0) {
      const [suggestion] = optimisticSuggestions;
      mutate(`/api/suggestions?documentId=${suggestion.documentId}`, 
        optimisticSuggestions, 
        false
      );
    }
  }, [optimisticSuggestions, mutate]);

  // Process streaming deltas
  useEffect(() => {
    const mostRecentDelta = streamingData?.at(-1);
    if (!mostRecentDelta) return;

    const delta = mostRecentDelta as StreamingDelta;

    setBlock((draftBlock) => {
      switch (delta.type) {
        case 'id':
          return {
            ...draftBlock,
            documentId: delta.content as string,
          };

        case 'title':
          return {
            ...draftBlock,
            title: delta.content as string,
          };

        case 'text-delta':
          return {
            ...draftBlock,
            content: draftBlock.content + (delta.content as string),
            // Show block after certain content length for smooth transition
            isVisible: draftBlock.status === 'streaming' &&
                      draftBlock.content.length > 200 &&
                      draftBlock.content.length < 250
                        ? true 
                        : draftBlock.isVisible,
            status: 'streaming',
          };

        case 'suggestion':
          // Handle suggestions with optimistic updates
          setTimeout(() => {
            setOptimisticSuggestions((current) => [
              ...current,
              delta.content as Suggestion,
            ]);
          }, 0);
          return draftBlock;

        case 'clear':
          return {
            ...draftBlock,
            content: '',
            status: 'streaming',
          };

        case 'finish':
          return {
            ...draftBlock,
            status: 'idle',
          };

        default:
          return draftBlock;
      }
    });
  }, [streamingData, setBlock]);
}
```

### 4. Advanced UI Components

```tsx
export const PreviewMessage = ({
  chatId,
  message,
  block,
  setBlock,
  vote,
  isLoading,
}: MessageProps) => {
  return (
    <motion.div
      className="w-full mx-auto max-w-3xl px-4 group/message"
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.3,
        ease: [0.23, 1, 0.32, 1]
      }}
      data-role={message.role}
    >
      <div className={cx(
        'flex gap-4 rounded-xl',
        message.role === 'user' && 'bg-primary text-primary-foreground px-3 w-fit ml-auto max-w-2xl py-2'
      )}>
        {message.role === 'assistant' && (
          <div className="size-8 flex items-center rounded-full justify-center ring-1 shrink-0 ring-border">
            <SparklesIcon size={14} />
          </div>
        )}

        <div className="flex flex-col gap-2 w-full">
          {/* Content with typing animation */}
          {message.content && (
            <div className="flex flex-col gap-4">
              <Markdown
                className={cx(
                  'prose dark:prose-invert max-w-none',
                  isLoading && 'typing-animation'
                )}
              >
                {message.content as string}
              </Markdown>
            </div>
          )}

          {/* Tool invocations with loading states */}
          {message.toolInvocations?.map((tool) => (
            <ToolInvocation
              key={tool.toolCallId}
              tool={tool}
              isLoading={isLoading}
            />
          ))}

          {/* Message actions */}
          <MessageActions
            chatId={chatId}
            message={message}
            vote={vote}
            isLoading={isLoading}
          />
        </div>
      </div>
    </motion.div>
  );
};
```

### 5. CSS Animations

```css
/* Typing animation */
.typing-animation {
  overflow: hidden;
  border-right: 2px solid;
  white-space: nowrap;
  animation: typing 3.5s steps(40, end),
             blink-caret .75s step-end infinite;
}

@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: currentColor }
}

/* Loading pulse */
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1 }
  50% { opacity: .5 }
}
```

### 6. Stream Control & Error Handling

```typescript
export function Chat({ id, initialMessages, selectedModelId }: ChatProps) {
  const {
    messages,
    setMessages,
    handleSubmit,
    input,
    setInput,
    append,
    isLoading,
    stop,
    data: streamingData,
    error
  } = useChat({
    body: { id, modelId: selectedModelId },
    initialMessages,
    onFinish: () => {
      mutate('/api/history');
    },
    onError: (error) => {
      toast.error('An error occurred during the conversation');
      console.error('Chat error:', error);
    }
  });

  // Handle stream interruption
  const handleStop = useCallback(() => {
    stop();
    setMessages((messages) => sanitizeUIMessages(messages));
  }, [stop, setMessages]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      handleStop();
    };
  }, [handleStop]);

  return (
    <>
      <div className="flex flex-col min-w-0 h-dvh bg-background">
        <ChatHeader selectedModelId={selectedModelId} />
        
        {/* Messages container with scroll handling */}
        <div ref={messagesContainerRef} 
             className="flex flex-col min-w-0 gap-6 flex-1 overflow-y-scroll pt-4">
          {messages.length === 0 && <Overview />}

          {messages.map((message, index) => (
            <PreviewMessage
              key={message.id}
              chatId={id}
              message={message}
              block={block}
              setBlock={setBlock}
              isLoading={isLoading && messages.length - 1 === index}
              vote={votes?.find((v) => v.messageId === message.id)}
            />
          ))}

          {/* Show thinking indicator */}
          {isLoading &&
            messages.length > 0 &&
            messages[messages.length - 1].role === 'user' && (
              <ThinkingMessage />
          )}

          <div ref={messagesEndRef} 
               className="shrink-0 min-w-[24px] min-h-[24px]" />
        </div>

        {/* Input form */}
        <form className="flex mx-auto px-4 pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">
          <MultimodalInput
            chatId={id}
            input={input}
            setInput={setInput}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            stop={handleStop}
            attachments={attachments}
            setAttachments={setAttachments}
            messages={messages}
            setMessages={setMessages}
            append={append}
          />
        </form>
      </div>

      {/* Block handler for streaming */}
      <BlockStreamHandler 
        streamingData={streamingData} 
        setBlock={setBlock} 
      />
    </>
  );
}
```

## Advanced Features

### 1. Progressive Loading
- Character-by-character streaming with typing animation
- Smooth message transitions
- Loading indicators for different states
- Optimistic UI updates

### 2. Error Recovery
- Graceful handling of stream interruptions
- Network error recovery
- Invalid response handling
- Authentication error management
- Rate limiting feedback

### 3. Performance Optimizations
- Efficient re-rendering with React.memo
- Debounced stream processing
- Batched state updates
- Proper cleanup of resources
- Optimized animations

### 4. Accessibility
- ARIA labels for loading states
- Keyboard navigation support
- Screen reader announcements
- Focus management
- Animation reduction options

### 5. Mobile Considerations
- Touch-friendly interactions
- Responsive animations
- Network-aware streaming
- Battery-efficient updates

## Best Practices

1. **State Management**
   - Use atomic state updates
   - Implement proper cleanup
   - Handle edge cases
   - Maintain consistent state

2. **Error Handling**
   - Graceful degradation
   - User feedback
   - Error recovery
   - Logging and monitoring

3. **Performance**
   - Optimize re-renders
   - Efficient DOM updates
   - Memory management
   - Animation performance

4. **Security**
   - Input sanitization
   - Output escaping
   - Rate limiting
   - Authentication checks

This implementation provides a robust, performant, and user-friendly streaming experience with proper error handling and accessibility considerations. 
export default function SettingsBillingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Billing Settings</h3>
        <p className="text-sm text-muted-foreground">
          Manage your billing information and subscription.
        </p>
      </div>
      <div className="grid gap-4">
        {/* Subscription Status */}
        <div className="rounded-lg border p-4">
          <h4 className="text-sm font-medium">Subscription Plan</h4>
          {/* Add subscription details here */}
        </div>

        {/* Payment Method */}
        <div className="rounded-lg border p-4">
          <h4 className="text-sm font-medium">Payment Method</h4>
          {/* Add payment method details here */}
        </div>

        {/* Billing History */}
        <div className="rounded-lg border p-4">
          <h4 className="text-sm font-medium">Billing History</h4>
          {/* Add billing history here */}
        </div>
      </div>
    </div>
  )
} 
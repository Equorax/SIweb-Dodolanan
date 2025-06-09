// app/admin/dashboard/components/DashboardData.ts
export async function fetchDashboardData() {
  const response = await fetch('/api/dashboard');
  if (!response.ok) {
    throw new Error('Failed to fetch dashboard data');
  }
  const data = await response.json();
  
  // Format monthlyRevenue data for the chart
  const formattedData = data.monthlyRevenue.map((item: any) => {
    const date = new Date(item.month);
    return {
      name: date.toLocaleString('default', { month: 'short' }) + " " + date.getFullYear(),
      revenue: parseFloat(item.revenue)
    };
  });
  
  return {
    ...data,
    monthlyRevenue: formattedData
  };
}
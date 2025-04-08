
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiService } from "@/services/apiService";
import { SalesData } from "@/types/api";
import { formatYearMonth } from "@/lib/date-utils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import ProductFilter from "@/components/sales/ProductFilter";
import DateRangeFilter from "@/components/sales/DateRangeFilter";
import { Loader2 } from "lucide-react";

const Sales = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [products, setProducts] = useState<{ id: number; name: string }[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);

  // Load products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await apiService.getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Load sales data
  useEffect(() => {
    const fetchSalesData = async () => {
      setIsLoading(true);
      try {
        const data = await apiService.getSales(
          startDate,
          endDate,
          selectedProducts.length > 0 ? selectedProducts : undefined
        );
        setSalesData(data);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSalesData();
  }, [selectedProducts, startDate, endDate]);

  // Prepare data for chart
  const prepareChartData = () => {
    const monthsMap = new Map<string, { name: string; [key: string]: any }>();
    
    // Initialize with all months
    salesData?.forEach((item) => {
      if (item.year_month && !monthsMap.has(item.year_month)) {
        monthsMap.set(item.year_month, {
          name: formatYearMonth(item.year_month),
          month: item.year_month,
        });
      }
    });
    
    // Aggregate data by month and product
    salesData?.forEach((item) => {
      if (!item.year_month || item.product_id === undefined) return;
      
      const monthData = monthsMap.get(item.year_month);
      if (monthData) {
        const productName = products.find(p => p.id === item.product_id)?.name || `Product ${item.product_id}`;
        monthData[productName] = item.sales_turnover;
      }
    });
    
    // Convert to array and sort by month
    return Array.from(monthsMap.values())
      .sort((a, b) => a.month.localeCompare(b.month));
  };

  const chartData = prepareChartData();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Sales Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DateRangeFilter 
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />
        <ProductFilter 
          products={products}
          selectedProducts={selectedProducts}
          onSelectionChange={setSelectedProducts}
        />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Monthly Sales Revenue</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-80">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value}`} />
                <Legend />
                {products
                  .filter(product => selectedProducts.length === 0 || selectedProducts.includes(product.id))
                  .map((product) => (
                    <Bar 
                      key={product.id} 
                      dataKey={product.name} 
                      fill={`hsl(${(product.id * 60) % 360}, 70%, 60%)`} 
                    />
                  ))}
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex justify-center items-center h-80">
              <p className="text-muted-foreground">No data available for selected filters</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Sales;

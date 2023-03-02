<template>
    <div>
        <span>Sales Orders Count: {{ sales_orders.length }}</span>
    </div>
</template>
  
<script>
import useSWRV from 'swrv'
import fetcher from '@/plugins/fetcher.js'
export default {
    name: 'Count',
    setup() {
        const { data: sales_orders } = useSWRV('http://192.168.1.57:8169/checker/sales-orders', fetcher)
        console.log(sales_orders)

        return {
            sales_orders
        }
    },
}
</script>
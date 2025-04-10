const { createApp, onMounted, ref ,computed,watch,nextTick} = Vue;


  

const App = {
    setup() {
        const chartInstance = ref(null);
        const rawData = ref([]);  // 存放從 API 獲取的原始數據
        const chartRef = ref(null);  // Canvas DOM 參考
        const isMounted = ref(false); // 標記 Vue 是否已掛載

        // 透過 computed 來過濾數據
        const filteredData = computed(() => {
            return rawData.value.filter(item => item.day);  // 過濾數據
        });

        const fatchData = async ()=>{
            try{
                const res = await fetch('/03.expenses-chart-component-main/data.json');
                const data = await res.json();
                rawData.value = data;  // 更新 Vue 響應式數據
            } catch(error){
                console.error("無法獲取資料",error);
            }
        }

        const objRe = Vue.reactive(rawData)
        //console.log('objRe',objRe);
        //const  date = new Date();
            //console.log(date.getDay());
        //getDate
        //filter CurrentDay
        //addClass

        // 監聽 filteredData 變化並更新 Chart.js
        
        watch(filteredData, (newData) => {
            const canvus = document.getElementById('ctx').getContext('2d')

            function getBarColor(index, lightness = 65) {
                const today = new Date().getDay();
                return index === today - 1
                  ? `hsl(186, 34%, ${lightness}%)`
                  : `hsl(10, 79%, ${lightness}%)`;
              }
              
            
            chartInstance.value = new Chart(canvus, {
                type: 'bar',
                data: {
                    labels: rawData.value.map(item => item.day),
                    datasets: [{
                        font:{
                            size:20,
                            
                        },
                        data: rawData.value.map(item => item.amount),
                        borderRadius:5,
                        borderSkipped:false,
                        backgroundColor:(ctx) => getBarColor(ctx.index, 65),
                        hoverBackgroundColor:(ctx) => getBarColor(ctx.index, 75),
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            display: false, // 隱藏 Y 軸
                            grid: {
                                display: false // 隱藏背景隔線
                            }
                        },
                        x: {
                            grid: {
                                display: false,    // 不顯示網格線
                                drawBorder: false,  // 不顯示軸的邊框線
                            },
                            border: {
                                display:false,
                            },
                            ticks: {
                                display: true ,  // 顯示每個 bar 的標籤
                                color:'hsl(28, 10%, 53%)',
                            }
                        }
                    },
                    onHover: function (event,legendItem, legend) {
                        const canvas = event.native?.target;
                        if (canvas) {
                            canvas.style.cursor = legendItem.length ? 'pointer' : 'default';
                        }
                    },
                    plugins:{
                        legend:{
                            display:false,
                        },
                        tooltip:{
                            enabled: true,       // 啟用 tooltip
                            maintainAspectRatio: false,
                            position: 'nearest', // 讓 tooltip 顯示在 bar 附近
                            yAlign: 'bottom',    // 固定顯示在 bar 上方
                            caretSize: 0,         // **隱藏 tooltip 箭頭**
                            caretPadding: 5,      // **控制 tooltip 與 bar 之間的距離**
                            backgroundColor: 'hsl(25, 47%, 15%)', // 設定背景顏色
                            titleColor: 'white', // 設定標題顏色
                            bodyColor: 'white',  // 設定內容文字顏色
                            displayColors: false, // 移除小色塊（避免干擾）
                            callbacks: {
                                title: () => null,  // **移除 tooltip 的標題**
                                label: (context) => `$${context.raw}` // **數值前加上 $ 符號**
                            },
                            positioner: function (elements, eventPosition) {
                                console.log(elementsm,eventPosition);
                                if (!elements.length) {
                                    return false;
                                }
                        
                                const position = elements[0].element;
                                return {
                                    x: position.x,
                                    y: position.y - 20 // **固定 Tooltip 高度，使其離開 bar 一定距離**
                                };
                            }
                        }
                    },
                },
               
                
            });
        }, { deep: true }); 


        onMounted(()=>{
            isMounted.value = true;
            fatchData();
        })


        return {chartRef};
    }
};

createApp(App).mount('#app');

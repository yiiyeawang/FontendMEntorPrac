
const { createApp, ref, onMounted } = Vue;


createApp({
    setup(){
        const data = ref([]);
        const selectedTimeFrame = ref('daily')
        const bgImgArr = ['bg-icon-work','bg-icon-play','bg-icon-study','bg-icon-exercise','bg-icon-social','bg-icon-self-care'];
        const bgColorArr = ['bg-primary-lightRed','bg-primary-softBlue','bg-primary-lightRedStudy','bg-primary-limeGreen','bg-primary-violet','bg-primary-softOrange'];


        const fetchData = async () => {
            try{
                const res = await fetch('/02.time-tracking-dashboard-main/data.json');
                const rawdata = await res.json();

                data.value = rawdata.map((item,index)=>(
                    {
                        ...item,
                        bgImg:bgImgArr[index],
                        bgColor:bgColorArr[index],
                        })
                    )
            } catch(error) {
                console.error("❌ 無法獲取資料", error);
            }
        }


        const changeTimeFrame = (timeFrame) => {
            selectedTimeFrame.value = timeFrame;
        }

        onMounted(fetchData);

        return{data ,selectedTimeFrame ,changeTimeFrame}
    }
}).mount('#app')
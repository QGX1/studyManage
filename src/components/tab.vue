<template>
    <div id="tab" class="nav">
        <ul>
            <router-link :to="{name: '主页'}"  tag="li" exact>
                <div>
                    <img :src="require('../assets/home.png')" class="img2">
                </div>
                <div>
                    首页
                </div>
            </router-link>

            <router-link :to="{name: 'note'}"  tag="li">
                <div>
                    <img :src="require('../assets/note.png')" class="img2">
                </div>
                <div>
                    笔记
                </div>
            </router-link>

            <router-link :to="{name: 'mine'}"  tag="li">
                <div>
                    <img :src="require('../assets/mine.png')" class="img2">
                </div>
                <div>
                    我的
                </div>
            </router-link>
        </ul>
    </div>
</template>


<script>
export default {
    data(){
        return {};
    },
};
</script>

<style lang="less" type="text/less">
#tab{
    z-index: 25;
}
.nav{
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: rgb(253, 253, 253);
    box-shadow: 0 2px 4px #000;
    width: 100%;
    height: 50px;
& > ul, & > ul > li {
    margin: 0;
    padding: 0;
} 
ul {
    display: table;
    width: 100%;
& > li {
    text-align: center;
    font-size: 15px;
    display: table-cell;
    padding: 8px 12px;
&.router-link-active{
    color: rgb(3, 134, 128);

}
& > div {
    font-size: 10px;
& > i {
    font-size: 10px;
}
}
}
}
}
.img2{
width: 20px;
height: 20px
}
</style>


<template >
<div class='col-sm-12 col-md-4 col-lg-3' >
    <a target="_blank" v-bind:href="img.url" >
    <img 
        class='img-resize'
    v-bind:src="formattedImage.download_url" 
    /> </a>
    <div >{{ img.author }}</div>
</div>
</template>

<script>
export default {
    //name: 'MainPageImgThumb',
    data: function(){
        /* todo to redo with typedefs */
        return ({
            // id:null,
            // author:'',
            // download_url:'',
            // url:'',
            // heigth:0,
            // width:0
            //img:{}
        });
    },
    computed: {
        formattedImage: function(){
            /* Last to url parts are resolution, we need to change them */
            /* Todo to update using regex, or search based on id and next '/' */
            let img= Object.assign({},this.img);
            let url = img.download_url.split('/');
            url = url.splice(0,url.length-2);
            url = url.join('/') + '/367/400';
            img.download_url = url;

            return img;
        }
    },
    /* todo to redo into a reusable object from lib */
    props:{
        img : {
            type: Object,
        }
    }
}
</script>
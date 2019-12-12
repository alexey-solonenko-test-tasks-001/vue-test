<template >
<div class='col-sm-12 col-md-4 col-lg-3 pb-1 ' v-bind:class="filterByAuthor">
    <div class='neat-border'>
        <!-- <a target="_blank" v-bind:href="img.url" > -->
        <img 
            class='img-resize w-100 cursor-pointer'
        v-bind:src="formattedImage.download_url" 
            @click="$emit(openModal,img)"
        />
        <!-- </a> -->
        <div >{{ img.author }}</div>
    </div>
</div>
</template>

<script>
/**
 * @typedef import('../control_panel/controlPanelEvents.js').controlPanelEvents
 */

/** @type controlPanelEvents */
import controlPanelEvents from "../control_panel/controlPanelEvents";

export default {
    data: function(){
        return ({
            openModal: controlPanelEvents.openModal,
            closeModal: controlPanelEvents.closeModal,
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
        },
        filterByAuthor : function(){
            if(!this.searchKeyword) return '';
            if(this.img.author.toString().toLowerCase().search(this.searchKeyword.toLowerCase()) > -1){
                return '';
            } else {
                return 'd-none';
            }
        }
    },
    /* todo to redo into a reusable object from lib */
    props:{
        img : {
            type: Object,
        },
        searchKeyword : {
            type: String
        },
    }
}
</script>
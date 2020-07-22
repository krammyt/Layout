<template>
    <div class="iv-pane-wrapper" :style="widthObj" :class="positionalClass('iv-pane-wrapper')">
        <transition name="slide" :enter-active-class="(position =='left')? 'slide-to-the-left-enter' :'slide-to-the-right-enter'"
        :leave-active-class="(position =='left')? 'slide-to-the-left-leave' :'slide-to-the-right-leave'" appear>
        <div class="iv-pane"  v-show=showPane>
            <div class="iv-pane-content" :class="positionalClass('iv-pane-content')">
                <slot>Default pane</slot>
            </div>
            <div class="iv-drag-selector" :class="positionalClass('iv-drag-selector')" @mousedown="mouseDown"></div>
        </div>
        </transition>
        <button class="iv-pane-button" :class="positionalClass('iv-pane-button')" @click="showPane = !showPane" :style="buttonLeft">{{paneText}}</button>
        </div>
</template>
<script>
export default {
    name:"iv-pane",
    props:{
        position:{
            type:String,
            default:"left"
        }
    },
    data(){
        return{
            widthFraction:25,
            showPane:true,
            resizer:{
              adjusting:false,
              initPageX:null
            }
        }
    },
    computed:{
        widthObj(){
            return {width:(this.showPane)? `${this.widthFraction}%` : '0%'};
        },
        paneText(){
            return !(this.showPane ^ this.position == "left")? "⬇️":"⬆️";
        },
        buttonLeft(){
            if(this.position == "left"){
                return {'left':  this.showPane ? `${this.widthFraction}%` : 0}
            } else if(this.position == "right"){
                return {'left':  this.showPane ? `${100 - this.widthFraction}%` : '100%'}
            }else{
                throw Error("Unknown position");
            }
        },
    },
    methods:{
        positionalClass(base){
            return [`${base}-${this.position}`]
        },
        mouseDown(e){
            this.resizer.adjusting=true;
            this.resizer.initPageX=e.pageX;
            window.addEventListener("mousemove",this.resize);
            window.addEventListener("mouseup",this.mouseUp);    
        },
        mouseUp(){
            this.resizer.adjusting=false;
            window.removeEventListener("mouseup",this.mouseUp);
            window.removeEventListener("mousemove",this.resize);
        },
        resize(e){
            if(this.resizer.adjusting){
                let deltaX = (e.pageX - this.resizer.initPageX) * ((this.position == "left")? 1:-1);
                let deltaFrac = 50*deltaX/window.innerWidth;
                this.widthFraction += deltaFrac;
                this.resizer.initPageX = e.pageX;
            }   
        }
    }
}
</script>
<style>

.slide-to-the-left-enter{
    animation: slideleft 5s;

}
.slide-to-the-left-leave{
    animation: slideleft reverse 5s;

}

.slide-to-the-right-enter{
    animation: slideright 5s;

}
.slide-to-the-right-leave{
    animation: slideright 5s;
    animation-direction: reverse;
}

@keyframes slideleft {
    0%{transform: translateX(-100%);}
    100%{transform:translateX(0);}
}

@keyframes slideleftreverse {
    0%{transform: translateX(0);}
    100%{transform:translateX(-100%);}
}

@keyframes slideright {
    0%{ transform: translateX(100%);}
    100%{ transform:translateX(0);}
}
   
</style>
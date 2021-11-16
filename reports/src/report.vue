<template>
    <div id="container">
        <div class="header">
            <div class="header-text">
            <p >Accessibility Test Summary</p>
            <div class="test_info">Expand Tests: 
                <button v-bind:key="data" v-for="(data, index) in output" v-on:click="choseValue(data)" class="button_display" v-bind:class="{button_active : check(index)}">{{index+1}}</button>
            </div>
            </div>
            <div class="header-app-url" v-if="testSelected">app url:
                <a class="header-url" v-bind:href="result.url">{{result.url}}</a>
            </div>
        </div>

    
        <div class="result_details" v-if="testSelected">

        <div class="nav-left">
            <div v-bind:class="{'nav-left-1':true, 'active-nav':isSelected[0]}" v-on:click="showSummary(0)">InApplicable</div>
            <div v-bind:class="{'nav-left-2':true, 'active-nav':isSelected[1]}" v-on:click="showSummary(1)">Passes</div>
            <div v-bind:class="{'nav-left-3':true, 'active-nav':isSelected[2]}" v-on:click="showSummary(2)">InComplete</div>
            <div v-bind:class="{'nav-left-4':true, 'active-nav':isSelected[3]}" v-on:click="showSummary(3)">Violations</div>
        </div>

         <div class="nav-right">
            <div class="nav-right-header" v-bind:style={color:headerColor}>{{header}}</div>
                <div class="cards-view">
                <div class="nav-right-cards" v-bind:class="[updated=data.impact]" v-bind:key="data" v-for="data in selectedSummary" v-on:click="showDetails(data.id)">
                    <!-- <section class="serious">
                    </section> -->
                    <p class="impact">{{data.impact}}</p>
                    <p class="nav-cards-header">{{data.id}}</p>
                </div>
                </div>
                <div class="card-expanded" v-if="cardIsSelected">
                    <p class="card-expanded-id">{{selectedCardDetails.id}}</p>
                    <p class="card-expanded-description">{{selectedCardDetails.description}}</p>
                    <p class="card-expanded-tags">Tags: {{selectedCardDetails.tags}}</p>
                    <div class="help-box">
                        <p class="card-expanded-help">help: {{selectedCardDetails.help}}</p>
                        <a class="card-expanded-helpUrl"  v-bind:href="selectedCardDetails.helpUrl">{{selectedCardDetails.helpUrl}}</a>
                    </div>
                    
                    <div class="card-expanded-html" v-on:click="showHtml()">{{showHtmlText}}</div>
                    
                    <div v-if="showNode">
                    <div class="card-expanded-html-details" v-bind:key="node" v-for="node in nodeDetails">
                        <p class="failure-msg">{{node.failureSummary}}</p>
                        <p class="html-node">{{node.html}}</p>
                    </div>
                    </div>
                    <!-- <p class="card-expanded-html-details">{{nodeDetails}}</p> -->
                </div>
        </div>
        </div>

       
    </div>
</template>

<script>
import json from './data/output.json';

export default{
    name:'Reports',
    temp:'serious',
    data(){
        return{
            output:json,
            result:json[0],
            showSelection: false,
            show:false,
        testSelected:true,
           summaryHeader:{
               0:'InApplicable',
               1:'Passes',
               2:'InComplete',
               3:'Violations',
           },
            header:`${json[0]['violations'].length} Violations`,
            selectedSummary:  json[0]['violations'],  
           selectedCardDetails: {},
           showHtmlText:'hide html',
           showNode: true,
           nodeDetails:[],
           isSelected:{
               0:false,
               1:false,
               2:false,
               3:true,
           },
           headerColor:'#DD2424',
           color:{
               0:'#EDA8A8',
               1:'green',
               2:'#61CFF2',
               3:'#DD2424', 
            },
            updated: null,
            isCardActive:false,
            cardSelected:'',
            cardIsSelected:false,
        }; 
    },
    computed:{
        label(){
            return {[this.updated]:true}
        }
    },
    methods:{
        choseValue(key){    
            this.result = key;
            this.testSelected = true;
            this.header=`${this.result['violations'].length} Violations`;
            this.selectedSummary =  this.result['violations'];  
            this.isSelected = {0:false, 1:false, 2: false, 3:true};
            this.headerColor='#DD2424';
            this.cardIsSelected = false;

        },
        check(key){
                if(this.output[key] === this.result)
                return true;
        },

        getAccessibilityOutput(){

        console.log('this is the json data');
        console.log(this.result);
        },
        showSummary(key){
            const fetchedValue = `${this.summaryHeader[key]}`.toLowerCase();
            this.selectedSummary = this.result[fetchedValue];
            this.header = `${this.result[fetchedValue].length} ${fetchedValue.replace(fetchedValue.charAt(0), fetchedValue.charAt(0).toUpperCase())}`
            
            this.isSelected = {[key]:!this.isSelected[key]};
            this.headerColor = this.color[key];
            console.log('this.selectedSummary ',this.selectedSummary);
            this.cardIsSelected = false;
            
        },

        showDetails(key){
        
            console.log('value is' ,key);
            const output = this.selectedSummary.filter((val)=>{
                return val.id == key;
            })
            this.cardSelected = this.selectedCardDetails.class;
            this.selectedCardDetails = output[0];
            console.log('here',this.selectedCardDetails);
            const nodes = this.selectedCardDetails.nodes;
            this.nodeDetails = nodes;
            this.cardIsSelected = true;
            
        },
        showHtml(){
            this.showNode = !this.showNode;
            this.showNode ? (this.showHtmlText = 'hide html') : (this.showHtmlText = 'show html')         
        },
        setClass(inp){
            this.udpated = inp+'-label';
            console.log('this.pdated',this.updated);
        }

    }
}
</script>


<style>

body{
    overflow-y: auto;
}

.container{
    width: 100%;
    max-width: 100%;
}
    .header{
    width: 100%;
    height: 160px;
    background: #000000;
    box-sizing: border-box;
    }

    .header-text{
    width: 50%;
margin-left: 2%;
font-family: Roboto;
font-style: normal;
font-weight: 500;
font-size: 40px;
float: left;
color: #A28D8D;
    }
.test_info{
font-family: Roboto;
font-style: normal;
font-size: 20px;
color: grey;
box-sizing: border-box;
float: right;
}
.display_info{
    padding-top: 7%;
    box-sizing: border-box;
}
.select_value{
font-style: normal;
font-size: 20px;
color: white;
box-sizing: border-box;
}

.button_display{
    margin-right: 5px;
    border: 0px;
    font-weight: 20px;
}
.button_display:hover{
    background-color: skyblue;
}
.button_active{
    background-color: skyblue;
    width: 50px;
    height: 30px;
}

    .header-app-url{
        width: 307px;
height: 23px;
top: 64px;
font-family: Roboto;
font-style: normal;
font-weight: 500;
font-size: 20px;
line-height: 23px;
color: #41C3EC;
float: right;
text-overflow: ellipsis;
overflow: hidden;
white-space: nowrap;
    }

    .header-url{
        color: #41C3EC;
    }
    .nav-left{
    float: left;
    width: 100%;
    height: max-content;
    background: #FFF9F9;
    box-sizing: border-box;

    }

    .nav-left-1{
        float: left;
        width: 20%;
height: 64px;
margin-top: 5%;
margin-left: 2%;
background: #F7E4E4;
font-family: Roboto;
font-style: normal;
font-weight: 500;
font-size: 30px;
line-height: 47px;
text-align: center;
color: black;
box-sizing: border-box;
    }
    .nav-left-2{
float: left;
        width: 20%;
height: 64px;
margin-top: 5%;
margin-left: 2%;
background: #D2F4B0;
font-family: Roboto;
font-style: normal;
font-weight: 500;
font-size: 30px;
line-height: 47px;
text-align: center;
color: black;
box-sizing: border-box;
    }
    .nav-left-3{
float: left;
        width: 20%;
height: 64px;
margin-top: 5%;
margin-left: 2%;
background: #61CFF2;
font-family: Roboto;
font-style: normal;
font-weight: 500;
font-size: 30px;
line-height: 47px;
text-align: center;
color: black;
box-sizing: border-box;
    }
    .nav-left-4{
float: left;
        width: 20%;
height: 64px;
margin-top: 5%;
margin-left: 2%;
background: #DD2424;
font-family: Roboto;
font-style: normal;
font-weight: 500;
font-size: 30px;
line-height: 47px;
text-align: center;
color: #FFFFFF;
text-justify: auto;
box-sizing: border-box;
    }

        .nav-right{
        float: right;
        margin-top: 5%;
        width: 100%;
height: max-content;
background: #FCF6D9;
box-shadow: 0px 4px 4px rgba(221, 36, 36, 0.25);
box-sizing: border-box;
padding-bottom: 10px;

    }

    .nav-right-cards{
    width: 70%;
    float: left;
height: max-content;
background: #FFFFFF;
margin: 5%;
box-sizing: border-box;
border-left: 20px solid green;
    }

.nav-right-cards:active{
    border-right: 2px solid black;
    background-color: skyblue;
}

.impact{
font-family: Roboto;
font-style: normal;
font-weight: 500;
font-size: 10px;
line-height: 12px;
color: #000000;
margin-left: 2%;
float: left;
box-sizing: border-box;
}  

.nav-right-header{
    clear: both;
    font-family: Roboto;
font-style: normal;
font-weight: 500;
font-size: 30px;
line-height: 47px;
color: #DD2424;
margin:2%;
box-sizing: border-box;
position: sticky;
top:0
}
.nav-cards-header{
font-family: PT Serif;
font-style: normal;
font-weight: normal;
font-size: 20px;
line-height: 26px;
color: #063D65;
float: right;
margin: 5%;

}  

.cards-view{
    width: 30%;
    float: left;
    height: 500px;
    overflow-y: scroll;
    padding-bottom: 20px;
}
.cards-view::-webkit-scrollbar{
    display: none;
}

.card-expanded{
width: 60%;
height: 400px;
background: #FFFFFF;
box-sizing: border-box;
float: right;
margin: 2%;
overflow-y: scroll;
margin-bottom: 5%;
box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.25);

}

.card-expanded:hover{
    border: 1px solid #F8D72A;
}

.card-sticky{
    position: sticky;
top: 0;
}

.card-expanded::-webkit-scrollbar{
    display: none;
}

.card-expanded-id{
    font-family: PT Serif;
font-style: normal;
font-weight: bold;
font-size: 20px;
line-height: 26px;
color: #000000;
text-align: center;
margin: 2%;

}

.card-expanded-description{

font-family: PT Mono;
font-style: normal;
font-weight: normal;
font-size: 15px;
line-height: 20px;
color: #000000;
text-align: left;
margin: 4%;
margin-top: 10%;
}

.card-expanded-tags{
font-family: PT Serif;
font-style: normal;
font-weight: bold;
font-size: 15px;
line-height: 26px;
text-align: center;
margin: 2%;
color: #000000;
margin-top: 10%;
}

.help-box{
    margin: 5%;
    width: 90%;
    height: max-content;
    background: #FCF6D9;
    box-sizing: border-box;
    text-justify: inherit;
}
.card-expanded-help{
font-family: PT Mono;
font-style: normal;
font-weight: regular;
font-size: 15px;
line-height: 26px;
color: #000000;
text-align: left;
margin: 2%;
margin-top: 5%;
}
.card-expanded-helpUrl{
font-family: PT Serif;
font-style: normal;
font-weight: regular;
width: 80%;
font-size: 15px;
color: #38A6BE;
text-align: left;
overflow-wrap: break-word;
margin: 2%;
margin-top: 5%;
}
.card-expanded-html{
margin: 4%;
font-family: PT Serif;
font-style: normal;
font-weight: bold;
font-size: 15px;
line-height: 26px;
text-decoration: underline;
color: #38A6BE;
}
.card-expanded-html-details{
margin: 2%;
box-sizing: border-box;
background: #FCF6D9;
height: max-content;
width: 90%;
overflow-wrap: break-word;
}

.failure-msg{
font-family: PT Serif;
font-style: normal;
font-weight: bold;
width: 80%;
font-size: 15px;
color: red;
text-align: left;
overflow-wrap: break-word;
margin: 2%;
margin-top: 5%;
}
.html-node{
    font-family: PT Mono;
font-style: normal;
font-weight: Regular;
width: 80%;
font-size: 15px;
color: black;
text-align: left;
overflow-wrap: break-word;
margin: 2%;
margin-top: 5%;
}

.active-nav{
box-shadow: 0px 12px 12px rgba(0, 0, 0, 0.25);
text-justify: auto;
box-sizing: border-box;
border: 3px dashed black;
}

.active-header{
color: #DD2424;
margin:2%;
box-sizing: border-box;
}

.serious{
    border-left: 20px solid lightsalmon;
}

.minor{
    border-left: 20px solid yellow;
}

.critical{
     border-left: 20px solid red;
}

.moderate{
    border-left: 20px solid lightpink;
}

.default-label{
    border-left: 20px solid green;
}

.selected-card{
border: 1px solid #000000;  
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>
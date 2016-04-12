$(document).ready(function(){
	$(".slider1").slider({
		min: 0,
		max:500,
		step:10,
		orientation:'horizontal',
		value:0,
		scale:'linear',
		});
			
	$(".slider2").slider({
		min: 500,
		max:100000,
		step:10,
		orientation:'horizontal',
		value:500,
		scale:'linear'
	  	});
	
	$(".slider3").slider({
		min: 0,
		max:1000,
		step:10,
		orientation:'horizontal',
		value:0,
		scale:'linear'
	   	});
	
	$(".slider4").slider({
		min: 1000,
		max:100000,
		step:100,
		orientation:'horizontal',
		value:1000,
		scale:'linear'
	    
	});
});

var src,dest,month1,day1,year1,month2,dest2,day2,maxbytes,minbytes,maxpcks,minpcks,res;

function check(){
	src=document.getElementById("source").value;
	dest=document.getElementById("dest").value;
	month1=document.getElementById("month1").value;
	day1=document.getElementById("day1").value;
	year1=document.getElementById("year1").value;
	month2=document.getElementById("month2").value;
	day2=document.getElementById("day2").value;
	year2=document.getElementById("year2").value;
	minbytes=$('.slider1').slider("getValue");
	maxbytes=$('.slider2').slider("getValue");
	minpcks=$('.slider3').slider("getValue");
	maxpcks=$('.slider4').slider("getValue");
	
	var request='{"src": "'+src+'", "dest": "'+dest+' ", "day1": "'+day1+' ", "month1": "'+month1+' ", "year1": "'+year1+' ", "month2": "'+month2+' ", "day2": "'+day2+' ", "year2":"'+year2+' ", "minbytes": "'+minbytes+' ", "maxbytes": " '+maxbytes+'", "minpcks": " '+minpcks+'", "maxpcks": "'+maxpcks+'"}';
	var jstr=jQuery.parseJSON(request);
	
	$.ajax({
        url: '/',
        data: jstr,
        type: 'POST',
        jsonpCallback: 'callback',
        success: function (data) {
           dispbytes(data);
           dispacks(data)
            
        },
        error: function (xhr, status, error) {
            console.log('Error: ' + error.message);	        
        },
    });
	
	setInterval(function(){
	 $.ajax({
	        url: '/',
	        data: jstr,
	        type: 'POST',
	        jsonpCallback: 'callback',
	        success: function (data) {	        
	           repeatX(data);
	           repeatY(data)
	            
	        },
	        error: function (xhr, status, error) {
	            console.log('Error: ' + error.message);	        
	        },
	    });
	},1000);
	
	
	function dispbytes(res){

		document.getElementById("bargraph1").innerHTML="";
		
		var bytes=new Array();
		
		jQuery.each(res,function(i,val){
			//alert("bytes "+res[i].sum_bytes_kb+" packets "+ res[i].sum_packets);
			bytes[i]=res[i].sum_bytes_kb;
		});
		
		var svg=d3.select("#bargraph1").append("svg")
		                         .attr("width",2000)
		                         .attr("height",200)
		
		                         //code for bytes starts here
		                         
		        svg.selectAll("rect")
		                 .data(bytes)
		                 .enter()
		                 .append("rect")
		                 .attr("x", function(d,i){
		                	 return (i*21);
		                 })
                         .attr("y", function(d){
                        	 return 200-(d/1000)-60;
                         })
                         .style("width",20)
		                 .style("height",function(d){
		                	 return d/1000+"px";
		                 })
		                 .attr("fill", function(d) {
		                	    return "rgb(0, 0, " + Math.round(d/500) + ")";
		                	});
		
						svg.selectAll("text")
						   .data(bytes)
						   .enter()
						   .append("text")
						   .text(function(d) {
						   		return Math.round(d/1000);
						   })
						   .attr("text-anchor", "middle")
						   .attr("x", function(d, i) {
						   		return i*21.5;
						   })
						   .attr("y", function(d) {
							   return 190-(d/1000)-60
						   })
						   .attr("font-family", "sans-serif")
						   .attr("font-size", "11px")
						   .attr("fill", "white");
		if(bytes.length > 10){				
		var xScale=d3.scale.linear()
		             .domain([0, bytes.length])
                     .range([0, bytes.length*20]);		                 
		
		var xaxis= d3.svg.axis()
                          .scale(xScale)                         	
		
		svg.append("g")
		.attr("class","axis")
		.call(xaxis)
		.attr("transform","translate(5,"+145+")");
		                     
		
		}
                         //code for bytes ends here
     
		                
	}
	function dispacks(res){
		
		document.getElementById("bargraph2").innerHTML="";
		
		var packs=new Array();
		
		jQuery.each(res,function(i,val){
			//alert("bytes "+res[i].sum_bytes_kb+" packets "+ res[i].sum_packets);
			packs[i]=res[i].sum_packets;
		});
		
		var svg2=d3.select("#bargraph2").append("svg")
								        .attr("width",2000)
								        .attr("height",200)		                        
										
		                         //code for bytes starts here
		                         
		         svg2.selectAll("rect")
		                 .data(packs)
		                 .enter()
		                 .append("rect")
		                 .attr("x", function(d,i){
		                	 return (i*21)+10;
		                 })
                         .attr("y", function(d){
                        	 return 200-(d/1000)-100;
                         })
                         .style("width",20)
		                 .style("height",function(d){
		                	 return d/1000+"px";
		                 })
		                 .attr("fill", function(d) {
		                	    return "rgb(0, 0, " + Math.round(d/500) + ")";
		                	});
		
						svg2.selectAll("text")
						   .data(packs)
						   .enter()
						   .append("text")
						   .text(function(d) {
						   		return Math.round(d/1000);
						   })
						   .attr("text-anchor", "middle")
						   .attr("x", function(d, i) {
						   		return (i*21.5)+10;
						   })
						   .attr("y", function(d) {
							   return 190-(d/1000)-100
						   })
						   .attr("font-family", "sans-serif")
						   .attr("font-size", "11px")
						   .attr("fill", "white");
		if(packs.length > 10){				
		var xScale=d3.scale.linear()
		             .domain([0, packs.length])
                     .range([0, packs.length*20]);		                 
		
		var xaxis= d3.svg.axis()
                          .scale(xScale)                         	
		
		svg2.append("g")
		.attr("class","axis")
		.call(xaxis)
		.attr("transform","translate(15,"+105+")");
		}
		                     
	}
	
	function repeatX(res){
		
		var newbytes=new Array();
		
		jQuery.each(res,function(i,val){
			//alert("bytes "+res[i].sum_bytes_kb+" packets "+ res[i].sum_packets);
			newbytes[i]=res[i].sum_bytes_kb;
		});
		console.log(newbytes);
		
		var xScale=d3.scale.linear()
        .domain([0, newbytes.length])
        .range([0, newbytes.length*20]);		                 

   var xaxis= d3.svg.axis()
             .scale(xScale)   
		
	var svg=d3.select("#bargraph1").select("svg");
	
	                      svg.selectAll("rect")
								    .data(newbytes)
								    .transition()
								    .duration(50)
		                            .attr("x", function(d,i){
		                	 return (i*21);
		                 })
                         .attr("y", function(d){
                        	 return 200-(d/1000)-60;
                         })
                         .style("width",20)
		                 .style("height",function(d){
		                	 return d/1000+"px";
		                 });
	                      
	                      svg.selectAll("text")
						   .data(newbytes)
						   .text(function(d) {
						   		return Math.round(d/1000);
						   })
						   .attr("x", function(d, i) {
						   		return i*21.5;
						   })
						   .attr("y", function(d) {
							   return 190-(d/1000)-60
						   });
	}
	
function repeatY(res){
		
		var newpacks=new Array();
		
		jQuery.each(res,function(i,val){
			//alert("bytes "+res[i].sum_bytes_kb+" packets "+ res[i].sum_packets);
			newpacks[i]=res[i].sum_packets;
		});
		console.log(newpacks);
		
		var xScale=d3.scale.linear()
        .domain([0, newpacks.length])
        .range([0, newpacks.length*20]);		                 

   var xaxis= d3.svg.axis()
             .scale(xScale)   
		
	var svg2=d3.select("#bargraph2").select("svg");
	
	                      svg2.selectAll("rect")
								    .data(newpacks)
								    .transition()
								    .duration(50)
		                            .attr("x", function(d,i){
		                	 return (i*21)+10;
		                 })
                         .attr("y", function(d){
                        	 return 200-(d/1000)-100;
                         })
                         .style("width",20)
		                 .style("height",function(d){
		                	 return d/1000+"px";
		                 });
	                      
	                      svg2.selectAll("text")
						   .data(newpacks)
						   .text(function(d) {
						   		return Math.round(d/1000);
						   })						 
						   .attr("x", function(d, i) {
						   		return (i*21.5);
						   })
						   .attr("y", function(d) {
							   return 190-(d/1000)-100;
						   })
	}
	}
function createNode(element){
    return document.createElement(element);
}
function append(parent,el){
    return parent.appendChild(el);
}

const productContainer=document.getElementById('productContainer');
function productList(catNo){
    console.log(catNo);
    productContainer.innerHTML="";
    url="https://backend.ustraa.com/rest/V1/api/catalog/v1.0.1?category_id="+catNo;
    console.log(url);
    fetch(url)
    .then(response=>response.json())
    .then(json=>{
        let got=json.products;
        return got.map(function(data){
            let div2=createNode('div'),
            div3= createNode('div'),
            img=createNode('img'),
            div4= createNode('div'),
            div5= createNode('div'),
            div6= createNode('div'),
            div7= createNode('div'),
            div8= createNode('div'),
            div9= createNode('div');
            
            
            
            div2.className="row no-gutters productWrapper";
            div3.className="col-4 col-sm-3 col-xl-2";
            img.src=data.image_urls.x520;
            img.className="productImage";
            div4.className="col-6 col-sm-8 col-xl-9";
            div5.className="productName";
            div7.className="priceDescription";
            div9.className="col-2 col-sm-1 col-xl-1";

            append(productContainer,div2);
            append(div2,div3);
            append(div3,img);
            
            if(data.name.length<50){
                div5.innerHTML=data.name;
            }
            else{
                name=data.name.substring(0,47);
                name+='...';
                div5.innerHTML=name;
            }
            append(div4,div5);

            if(data.weight){
                div6.innerHTML="<small class='productWeight'> ("+data.weight+" "+data.weight_unit+")</small>";
                append(div4,div6);
            }

            div7.innerHTML="<span ><b> <i class='fa fa-inr' aria-hidden='true'></i> "+data.final_price+"</b></span>";

            if(data.final_price!=data.price){
                div7.innerHTML+="<span class='mrp'><i class='fa fa-inr' aria-hidden='true'></i> <del>"+data.price+"</del></span>";
            }
            
            append(div4,div7);
            
            if(data.is_in_stock){
                div8.innerHTML='<button type="button" class="btn btn-success mybtn"> ADD TO CART </button>';
            }
            else
            {
                div8.innerHTML='<button type="button" class="btn disabled mybtn"> OUT OF STOCK </button>';
            }

            append(div4,div8);
            append(div2,div4);

            if(data.rating){
                div9.innerHTML='<span class="productRating">'+data.rating+'<i class="fa fa-star" aria-hidden="true"></i></span>';
    
            }
            append(div2,div9);

        });
    })
    .catch(err=>{
        console.log('ERROR'+ err);
    });
}
const items=document.getElementById('cat');
fetch('https://backend.ustraa.com/rest/V1/api/homemenucategories/v1.0.1?device_type=mob')
    .then(response=>response.json())
    .then(json=>{
        let got=json.category_list;
        productList(226);
        return got.map(function(data){
            let div= createNode('div'),
            img=createNode('img');
            div.style.backgroundImage = "url('"+data.category_image+"')";
            img.src=data.category_image;
            if(div){
                console.log('div created');
            }
            else{
                console.log('div not created');
            }
            if(img){
                console.log('img created');
            }
            else{
                console.log('img not created');
            }
            console.log(data.category_image);
            div.className="item";
            div.className+=" centered";
            div.innerHTML="<a href='javascript:;' onclick='productList("+data.category_id+")'>"+data.category_name+"</a>"
            img.className="categoryImage";

            
            append(items,div);  

        });
        
       
        
    })
    .then(data=>{
        //creating view all diV at the end of slider.
        let div1= createNode('div');
        div1.className="item";
        append(items,div1);  
        let div2= createNode('div');
        div2.innerHTML=('VIEW ALL');
        div2.className="viewMore";
        append(div1,div2);
    })
    .catch(err=>{
        console.log('ERROR'+ err);
    });


function Product(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
}
let listProducts = [];
function Order(id, name, price, amount){
    this.id = id;
    this.name = name;
    this.price = price;
    this.amount = amount;
}
let listOrders = [];
let KEY_PRODUCT = "KEY_PRODUCT";
let KEY_ORDER = "KEY_ORDER";

function setLocalStorage(key, data){
    localStorage.setItem(key, JSON.stringify(data))
}

function getLocalStorage(key){
    return JSON.parse(localStorage.getItem(key))
}
function renderProduct() {
    let listProductsHtml = listProducts.map(function (Product) {
        return `
    <tr>
        <td id="nameId" value="${Product.name}">${Product.name}</td>
        <td id="price">${Product.price} <button  onclick="addToOrder(${Product.id})">+</button></td>
    </tr>  
    <tr>
    </tr>
    </table>
    `
         ;})
    document.querySelector("#idListProducts").innerHTML = listProductsHtml.join("");
}
function inIt(){
    if(getLocalStorage(KEY_PRODUCT)==null){
        listProducts = [
            new Product(0, "Cafe Latte", 22000 ),
            new Product(1, "Cappuccino", 23000 ),
            new Product(2, "Espresso", 18000 ),
            new Product(3, "Cafe Mocha", 16000),
            new Product(4, "Cafe Chai", 12000),
            new Product(5, "Cafe tea", 14000),
            new Product(6, "Cafe Chocolate",14000),
            new Product(7, "Cafe Lon", 16000),
            new Product(8, "Cafe Cherry", 15000 ),
            new Product(9, "Cafe Arabica", 18000),
            new Product(10, "Cafe Robusta", 15000)
        ];
        setLocalStorage(KEY_PRODUCT, listProducts);
    }else{
        listProducts = getLocalStorage(KEY_PRODUCT);
    }
    if(getLocalStorage(KEY_ORDER)==null){  
    }else{
        listOrders = getLocalStorage(KEY_ORDER);
    }
    renderProduct();
    renderOrderTable();
}
function issueInvoice(){
    localStorage.clear(KEY_PRODUCT)
    location.reload(KEY_PRODUCT)
    confirm('Xuất hoá đơn')
}
function addToOrder(idProduct){
    let product = listProducts.find(
        function(value){
            if(value.id==idProduct){
                return true;
            }
        }
    );
    let order  = new Order(product.id, product.name, product.price, 1);
    
    let indexOfOrderProduct = listOrders.findIndex(
        function(value){
            if(value.id ==idProduct){
                return true;price
            }
        }
    );
    if(indexOfOrderProduct!=-1){
        listOrders[indexOfOrderProduct].amount = listOrders[indexOfOrderProduct].amount + 1;
    }else{
        listOrders.push(order);
    }
    setLocalStorage(KEY_ORDER, listOrders);
    renderOrderTable();
}
function renderOrderTable(){
    let strHtml = `<table id="t02">
        <thead>
            <tr>
             <th colspan="4" id="idMenu">Hoá đơn thanh toán</th>
             </tr>
            <tr>
                <th id="idOrder">Tên sản phẩm</th>
                <th id="idOrder">Giá bán</th>
                <th id="idOrder">Số lượng</th>
                <th id="idOrder">Tiền sản phẩm</th>
            </tr>
        </thead>
        <tbody id="clear">`;
    let listOrdersHtml = listOrders.map(
        function(value){
            return `<tr>
                    <td>${value.name}</td>
                    <td id="payment1">${value.price +".VND"}</td>
                    <td id="payment1">${value.amount} <button id="back" onclick="subValue(${value.id})">-</button> <button id="back" onclick="addValue(${value.id})">+</button></td>
                    <td id="idProduct">${value.price * value.amount +".VND"}</td>
                </tr>`
        }    );
    let totalPrice = 0;
    for(let i = 0;i<listOrders.length;i++){
        totalPrice = totalPrice + listOrders[i].price*listOrders[i].amount; 
    }
    let strTotal = `<tr>
    <td colspan="3">Tổng là:</td>
    <td id="payment1">${totalPrice +".VND"}</td>
    </tr>`;
    let strBill = `<tr>
    <td colspan="3">In Hoá Đơn:</td>
    <td> <button id="back" onclick="issueInvoice()">Thanh toán</button></td>
    </tr>`;
    let strEnd = `</tbody>
        </table>`
    strHtml = strHtml + listOrdersHtml.join("") + strTotal + strBill + strEnd ;
    document.getElementById("idOrderTable").innerHTML = strHtml;
}
let Back=[]
function backValue(){
document.querySelector('#back1').innerHTML 
}
function subValue(idProduct){
    let indexOrder = listOrders.findIndex(
        function(v){
            if(v.id==idProduct){
                return true;
            }
        }
    );
    if(listOrders[indexOrder].amount>0){
        listOrders[indexOrder].amount--;
    }
    if(listOrders[indexOrder].amount==0){
        listOrders.splice(indexOrder, 1);
    }
    setLocalStorage(KEY_ORDER, listOrders);
    renderOrderTable();
}
function addValue(idProduct){
    let indexOrder = listOrders.findIndex(
        function(v){
            if(v.id==idProduct){
                return true;
            }
        }
    );
    listOrders[indexOrder].amount++;
    setLocalStorage(KEY_ORDER, listOrders);
    renderOrderTable();
}
let orderDetailEditing;
let orderEditing;
let orderDict;

async function loadOrders() {
    showLoader();
    try {
        const orderContainerList = document.getElementsByClassName('order-container-list')[0];
        orderContainerList.innerHTML = "";
        const response = await fetch('https://localhost:7238/OrderDetail/GetAllNested');

        const orderDetails = await response.json();
        const detailsByOrders = Object.groupBy(orderDetails, ({ orderId }) => orderId);
        orderDict = detailsByOrders;
        console.log("grouped: ", detailsByOrders);
        console.log("order 1:   ", detailsByOrders["1"][0]);
        for (const [key, details] of Object.entries(detailsByOrders)) {
            console.log("is that an order with 2 details: ", details);
            console.log("is that tea detail: ", details[1]);
            const orderDetail = details[0];
            console.log("val: ", orderDetail);
            const orderContainerElement = document.createElement("div");
            orderContainerElement.setAttribute("id", "order-container");
            const orderUpperContainerElement = document.createElement("div");
            orderUpperContainerElement.setAttribute("id", "order-upper-container");
            const orderContainerHeader = document.createElement("div");
            orderContainerHeader.classList.add("order-container-header");
            const orderTitle = document.createElement("h2");
            orderTitle.setAttribute("style", "font-size: 18px; margin-top: 10px; margin-left: 10px; margin-bottom: 25px");
            orderTitle.textContent = `Order #${orderDetail.orderId} - Table ${orderDetail.order.table.number}`;
            const orderEditIcon = document.createElement("i");
            orderEditIcon.setAttribute("class", "bi bi-pencil-square");
            orderEditIcon.setAttribute("style", "font-size: 36px; color:gray");
            orderEditIcon.onclick = function () {
                openEditOrderModel(orderDetail.orderId, orderDetail.order.tableId);
            }
            orderContainerHeader.appendChild(orderTitle);
            orderContainerHeader.appendChild(orderEditIcon);
            orderUpperContainerElement.appendChild(orderContainerHeader);

            for (let i = 0; i < details.length; i++) {

                let item = details[i];
                console.log("response: ", item);

                const orderElement = document.createElement("div");
                orderElement.classList.add("order");
                orderElement.innerHTML = `
                        <img id="order-image" src="images/food.png" />
                        <div id="order-detail">
                            <div>${item.menuItem.name}</div>
                            <div>${item.menuItem.category.name}</div>
                            <div id="price-quantity">
                                <div>\$${item.price}</div>
                                <div>Qty: ${item.quantity}</div>
                            </div>
                        </div>
            `;
                orderUpperContainerElement.appendChild(orderElement);

            }
            orderContainerElement.appendChild(orderUpperContainerElement);
            const editContainer = document.createElement("div");
            editContainer.classList.add("order-edit-container");
            editContainer.innerHTML = `
                <div>X${details.length} items</div>
                <div style="font-size:36px">
                    <i style="color: #DB79A9;" class="bi bi-x-square"></i>
                    <i style="color: #87B6A1;" class="bi bi-check-square"></i>
                </div>`;
            orderContainerElement.appendChild(editContainer);
            orderContainerList.appendChild(orderContainerElement);

        }
    }
    catch (error) {
        console.error("Error loading orders:", error);
    } finally {
        hideLoader();
    }



}
async function loadOrderContent(orderId) {
    const orderContainerList = document.getElementById('order-detail-list');
    orderContainerList.innerHTML = "";
    console.log(orderId);

    /*showLoader();*/
    try {
        const response = await fetch(`https://localhost:7238/OrderDetail/GetAllByOrder/${orderId}`);
        let orderDetails = await response.json();
        orderDetails = orderDict[orderId];
        console.log(orderDetails);

        orderContainerList.innerHTML = `
        <button class="button" style="justify-self:right" type="button" onclick="addOrderDetailOnEdit()">
            <i style="color: white;font-size:24px" class="bi bi-plus-square"></i>
            Add Menu Item
        </button>`;

        for (const [key, orderDetail] of Object.entries(orderDetails)) {
            console.log("val: ", orderDetail);

            //const orderContainerElement = document.createElement("div");
            //orderContainerElement.setAttribute("id", "order-container");
            //const orderUpperContainerElement = document.createElement("div");
            //orderUpperContainerElement.setAttribute("id", "order-upper-container");
            //const orderContainerHeader = document.createElement("div");
            //orderContainerHeader.classList.add("order-container-header");
            //const orderTitle = document.createElement("h2");
            //orderTitle.setAttribute("style", "font-size: 18px; margin-top: 10px; margin-left: 10px; margin-bottom: 25px");
            //orderTitle.textContent = `Order #${orderDetail.orderId} - Table ${orderDetail.order.table.number}`;
            //const orderEditIcon = document.createElement("i");
            //orderEditIcon.setAttribute("class", "bi bi-pencil-square");
            //orderEditIcon.setAttribute("style", "font-size: 36px; color:gray");
            //orderEditIcon.onclick = function () {
            //    openEditOrderModel(orderId);
            //}
            //orderContainerHeader.appendChild(orderTitle);
            //orderContainerHeader.appendChild(orderEditIcon);
            //orderUpperContainerElement.appendChild(orderContainerHeader);


            const orderElement = document.createElement("div");
            orderElement.classList.add("order");
            orderElement.innerHTML = `
                        <img id="order-image" src="images/food.png" />
                        <div id="order-detail">
                            <div class="order-detail-edit-container">
                                <div>
                                    <div>${orderDetail.menuItem.name}</div>
                                    <div>${orderDetail.menuItem.categoryId}</div>
                                </div>
                                <i style="font-size:24px;color:gray" class="bi bi-pencil-square" onclick="openEditOrderDetailModel(${orderDetail.id})"></i>  
                            </div> 
                            <div id="price-quantity">
                                <div>\$${orderDetail.price}</div>
                                <div>Qty: ${orderDetail.quantity}</div>
                            </div>
                        </div>
                      
            `;
            orderContainerList.appendChild(orderElement);


            //orderContainerElement.appendChild(orderUpperContainerElement);
            //const editContainer = document.createElement("div");
            //editContainer.classList.add("order-edit-container");
            //editContainer.innerHTML = `
            //    <div>X${detail.length} items</div>
            //    <div style="font-size:36px">
            //        <i style="color: #DB79A9;" class="bi bi-x-square"></i>
            //        <i style="color: #87B6A1;" class="bi bi-check-square"></i>
            //    </div>`;
            //orderContainerElement.appendChild(editContainer);
            //orderContainerList.appendChild(orderContainerElement);

        }
    }
    catch (error) {
        console.error("Error loading orders:", error);
    } finally {
        hideLoader();
    }



}

function addOrderDetailOnEdit() {
    console.log("a.");
    hideOrderDetailList();
    showAddDetailContainer();
    hideOrderButtons();
    showOrderDetailAddButtons();


}
async function createOrderDetailOnEdit() {
    console.log("a.");

    const menuSelect = document.getElementById("menu-item-select").querySelector("select");
    const quantityInput = document.getElementById("menu-item-quantity").querySelector("input");

    console.log("Selected menuItemId:", menuSelect.value);
    console.log("Quantity:", quantityInput.value);
    const menu = await getMenuItem(menuSelect?.value);
    const data =
    {
        "quantity": Number(quantityInput.value),
        "price": menu.price,
        "orderId": orderEditing,
        "menuItemId": menu.id,
    }

    const orderDetailId = await postOrderDetail(data);
    console.log(orderDetailId);
    orderDict[orderEditing].push({ ...data, id: orderDetailId ,menuItem:menu});
    loadOrderContent(orderEditing);
    cancelOrderDetail();



}
async function loadTables() {
    const tableSelect = document.getElementById("table-select");

    const response = await fetch('https://localhost:7238/Table/GetAll');
    const tables = await response.json();
    console.log(tables);

    const selectElement = document.createElement("select");
    selectElement.setAttribute("id", "table-select-select");
    selectElement.setAttribute("name", "table");
    selectElement.innerHTML = '<option disabled selected>Choose a table</option>';

    for (const table of tables) {
        console.log(table);
        const optionElement = document.createElement("option");
        optionElement.setAttribute("value", table.id);
        optionElement.setAttribute("id", "menu-select-option");
        optionElement.innerText = `Table ${table.number}`;
        selectElement.appendChild(optionElement);
    }
    tableSelect.appendChild(selectElement);
}

async function loadMenuItems(menuItemId = null) {
    const menuSelectElements = document.getElementsByClassName("menu-item-select");
    const response = await fetch('https://localhost:7238/MenuItem/GetAll');
    const menus = await response.json();
    console.log(menus);
    for (const menuSelect of menuSelectElements) {
        menuSelect.innerHTML = "";
        const selectElement = document.createElement("select");
        selectElement.setAttribute("name", "menuItem");
        selectElement.setAttribute("onchange", "showQuantity()");
        selectElement.innerHTML = `<option disabled ${menuItemId ? "" : "selected"}>Choose a menu</option>`;
        for (const item of menus) {
            console.log(item);
            const optionElement = document.createElement("option");
            optionElement.setAttribute("value", item.id);
            optionElement.innerText = item.name;
            if (menuItemId != null && item.id == menuItemId) {
                console.log("matched: ", menuItemId);
                optionElement.setAttribute("selected", "selected");
            }
            console.log(item.id);
            selectElement.appendChild(optionElement);
        }
        menuSelect.appendChild(selectElement);
    }
}


async function getMenuItem(id) {
    const response = await fetch(`https://localhost:7238/MenuItem/Get/${id}`);
    const menuItem = await response.json();
    console.log(menuItem);
    return menuItem;
}

async function getOrderDetail(id) {
    const response = await fetch(`https://localhost:7238/OrderDetail/GetNested/${id}`);
    const menuItem = await response.json();
    console.log(menuItem);
    return menuItem;
}


function openModal() {

    const editOrderTitle = document.getElementsByClassName("edit-modal-title")[0];
    editOrderTitle.innerText = "Create Order";

    const editButton = document.getElementById("modal-submit-button");
    editButton.innerText = "Create Order";

    const menuSelect = document.getElementById("menu-item-select");
    menuSelect.innerHTML = "";

    const editModal = document.getElementsByClassName("edit-modal")[0];
    editModal.classList.remove("hidden");

    hideOrderDetailList();
    hideOrderList();
    showAddDetailContainer();

}
function hideModal() {
    const editModal = document.getElementsByClassName("edit-modal")[0];
    editModal.classList.add("hidden");
}

function showQuantity() {
    const quantity = document.getElementById("menu-item-quantity");
    quantity.classList.remove("hidden");
}
function hideQuantity() {
    const quantity = document.getElementById("menu-item-quantity");
    quantity.classList.add("hidden");
}

function showLoader() {
    const loader = document.getElementById("loader");
    loader.classList.remove("hidden");
    const loaderContainer = document.getElementById("loader-container");
    loaderContainer.classList.remove("hidden");
    console.log("shows")
}
function hideLoader() {
    const loader = document.getElementById("loader");
    loader.classList.add("hidden");
    const loaderContainer = document.getElementById("loader-container");
    loaderContainer.classList.add("hidden");
    console.log("hides")

}
function showOrderDetailList() {
    const detailList = document.getElementById("order-detail-list");
    detailList.classList.remove("hidden");
}
function hideOrderDetailList() {
    const detailList = document.getElementById("order-detail-list");
    detailList.classList.add("hidden");
}

function hideOrderButtons() {
    const orderButtons = document.getElementsByClassName("order-button")[0];
    orderButtons.classList.add("hidden");
}
function showOrderButtons() {
    const orderButtons = document.getElementsByClassName("order-button")[0];
    orderButtons.classList.remove("hidden");
}
function hideOrderDetailButtons() {
    const orderDetailButtons = document.getElementsByClassName("order-detail-button")[0];
    orderDetailButtons.classList.add("hidden");
}
function showOrderDetailButtons() {
    const orderDetailButtons = document.getElementsByClassName("order-detail-button")[0];
    orderDetailButtons.classList.remove("hidden");
}
function hideOrderDetailAddButtons() {
    const orderDetailButtons = document.getElementsByClassName("order-detail-add-button")[0];
    orderDetailButtons.classList.add("hidden");
}
function showOrderDetailAddButtons() {
    const orderDetailButtons = document.getElementsByClassName("order-detail-add-button")[0];
    orderDetailButtons.classList.remove("hidden");
}
function hideOrderList() {
    const orderList = document.getElementsByClassName("order-container-list")[0];
    orderList.classList.add("hidden");
}
function showOrderList() {
    const orderList = document.getElementsByClassName("order-container-list")[0];
    orderList.classList.remove("hidden");
}
function hideSelectContainer() {
    const orderList = document.getElementsByClassName("select-container")[0];
    orderList.classList.add("hidden");
}
function showSelectContainer() {
    const orderList = document.getElementsByClassName("select-container")[0];
    orderList.classList.remove("hidden");
}
function hideAddDetailContainer() {
    const orderList = document.getElementById("add-menu-item-container");
    orderList.classList.add("hidden");
}
function showAddDetailContainer() {
    const orderList = document.getElementById("add-menu-item-container");
    orderList.classList.remove("hidden");
    loadMenuItems();
}


loadOrders();
loadTables();
loadMenuItems();

function cancelOrder() {
    console.log("form resetted");
    const orderCreateForm = document.getElementById("order-upper-container");
    orderCreateForm.reset();
    const editOuterContainer = document.getElementById("edit-menu-item-container");
    editOuterContainer.innerHTML = "";
    hideModal();
    showOrderList();
    loadOrders();
    hideAddDetailContainer();
    hideQuantity();

}

async function postOrder(data) {
    try {
        const response = await fetch('https://localhost:7238/Order/Create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log(responseData);

        return responseData.orderId;
    } catch (error) {
        console.error("Error posting order:", error);
        return null; 
    }
}

async function postOrderDetail(data) {
    try {
        const response = await fetch('https://localhost:7238/OrderDetail/Create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log(responseData);

        
        return responseData; 
    } catch (error) {
        console.error("Error posting order detail:", error);
        return null; 
    }
}



function updateOrder(data) {
    const response = fetch('https://localhost:7238/Order/Update', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
    return data;
}
function updateOrderDetail(data) {
    const response = fetch('https://localhost:7238/OrderDetail/Update', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
    return data;
}

function processOrder(event) {
    const editOrderTitle = document.getElementsByClassName("edit-modal-title")[0];
    if (editOrderTitle.innerText.includes("Edit")) {
        editOrder(event);
    }
    else {
        createOrder(event);
    }
}

async function createOrder(event) {
    alert("The form was submitted");
    event.preventDefault();
    const formData = new FormData(event.target);
    const tableId = formData.get("table");
    console.log(tableId);
    let data = { "TableId": tableId, "Status": "Pending" };
    const orderId = await postOrder(data);
    console.log(orderId);
    const menuItemId = formData.get("menuItem");
    const menuItem = await getMenuItem(menuItemId);
    const quantity = formData.get("quantity");
    console.log(menuItem);
    data =
    {
        "MenuItemId": Number(menuItemId),
        "Quantity": Number(quantity),
        "Price": menuItem.price,
        "OrderId": orderId
    };
    await postOrderDetail(data);

    hideModal();
    hideQuantity();
    window.location.reload();
    showLoader();
}

function editOrder(event) {
    event.preventDefault();
    console.log(event);
    const orderForm = document.getElementById("order-upper-container");
    const form = new FormData(orderForm);
    const tableId = form.get("table");
    console.log(tableId);
    const data = {
        id: orderEditing,
        tableId: tableId
    };
    updateOrder(data);
    cancelOrder();
    window.location.reload();
    showLoader();
}
function openEditOrderModel(orderId, tableId) {
    orderEditing = orderId;
    const editOrderTitle = document.getElementsByClassName("edit-modal-title")[0];
    editOrderTitle.innerText = "Edit Order";

    const editButton = document.getElementById("modal-submit-button");
    editButton.innerText = "Edit Order";

    const editModal = document.getElementsByClassName("edit-modal")[0];
    editModal.classList.remove("hidden");

    const tableSelect = document.getElementById("table-select-select");
    tableSelect.value = tableId;
    showOrderDetailList();
    hideOrderList();
    loadOrderContent(orderId);
}

async function openEditOrderDetailModel(id) {
    const orderDetail = await getOrderDetail(id);
    console.log(orderDetail);
    hideOrderDetailList();
    hideOrderButtons();
    showOrderDetailButtons();
    hideOrderDetailAddButtons();
    hideSelectContainer();
    const editOuterContainer = document.getElementById("edit-menu-item-container");
    editOuterContainer.classList.remove("hidden");

    const editItemContainer = document.createElement("div");
    editItemContainer.innerHTML = `
        <div id=${orderDetail.id} class="edit-detail-id-indicator hidden"></div>
        <h3 class="edit-modal-title" style="margin-top:20px;">Edit Menu Item</h3>
        <div class="order" style="margin-top:0px">
            <div id="order-detail">
                <div class="select-container">
                    <h4 style=" margin:10px 10px 10px 0px">Choose A Menu Item:</h4>
                    <div id="edit-menu-item-select" class="select-box menu-item-select">

                    </div>
                </div>
                <div id="menu-item-quantity" class="select-container ">
                    <h4 style=" margin:10px 10px 10px 0px">Choose Quantity:</h4>
                    <input id="menu-edit-quantity" name="quantity" type="number" class="quantity-input" min="1" max="50" value="${orderDetail.quantity}" />
                </div>
            </div>
        </div>
    
    `;
    editOuterContainer.appendChild(editItemContainer);
    loadMenuItems(orderDetail.menuItemId);
    const menuSelect = document.getElementsByName("menuItem");
    console.log(orderDetail);
    orderDetailEditing = orderDetail;


}
function cancelOrderDetail() {
    showOrderDetailList();
    showOrderButtons();
    hideOrderDetailButtons();
    hideOrderDetailAddButtons();
    showSelectContainer();
    hideAddDetailContainer();
    
    //const orderCreateForm = document.getElementById("order-upper-container");
    //orderCreateForm.reset();

    const editOuterContainer = document.getElementById("edit-menu-item-container");
    editOuterContainer.classList.add("hidden");
    editOuterContainer.innerHTML = "";
}
async function editOrderDetail() {

    const menuSelect = document.getElementById("edit-menu-item-select").querySelector("select");
    const quantityInput = document.getElementById("menu-edit-quantity");

    console.log("Selected menuItemId:", menuSelect.value);
    console.log("Quantity:", quantityInput.value);
    const menu = await getMenuItem(menuSelect?.value);
    const data =
    {
        "id": Number(orderDetailEditing.id),
        "quantity": Number(quantityInput.value),
        "price": menu.price,
        "orderId": orderDetailEditing.orderId,
        "menuItemId": menu.id
    }

    updateOrderDetail(data);
    const updatedDetail = orderDict[orderDetailEditing.orderId].findIndex(detail => detail.id == orderDetailEditing.id);
    orderDict[orderDetailEditing.orderId][updatedDetail] = { ...orderDict[orderDetailEditing.orderId][updatedDetail], menuItemId: menu.id, menuItem: menu ,quantity:data.quantity};
    loadOrderContent(orderDetailEditing.orderId);
    cancelOrderDetail();


}
const orderCreateForm = document.getElementById("order-upper-container");
orderCreateForm?.addEventListener("submit", processOrder);

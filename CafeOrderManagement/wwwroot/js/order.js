//tracks which order detail or order is being edited
let orderDetailEditing;
let orderEditing;
//temporary dictionary for orders and order details
let orderDict = {};

//hide and show functions for the elements
function showElementById(id) {
    const element = document.getElementById(id);
    element.classList.remove("hidden");
}
function hideElementById(id) {
    const element = document.getElementById(id);
    element.classList.add("hidden");
}
function showByClassName(name) {
    const element = document.getElementsByClassName(name)[0];
    element.classList.remove("hidden");
}
function hideByClassName(name) {
    const element = document.getElementsByClassName(name)[0];
    element.classList.add("hidden");
}
function showLoader() {
    showElementById("loader");
    showElementById("loader-container");
}
function hideLoader() {
    hideElementById("loader");
    hideElementById("loader-container");
}
showLoader();


//function to load orders and order details
async function loadOrders() {
    try {
        const orderContainerList = document.getElementsByClassName('order-container-list')[0];
        orderContainerList.innerHTML = "";

        const response = await fetch('https://localhost:7238/OrderDetail/GetAllNested');
        const orderDetails = await response.json();

        //arranging orders and order details into a collection
        //order details are grouped by their order ids
        let detailsByOrders = Object.groupBy(orderDetails, ({ orderId }) => orderId);
        Object.entries(detailsByOrders).forEach(([orderId, orderDetails]) => {
            const orderStatus = orderDetails[0]?.order.status;
            const tableId = orderDetails[0]?.order.tableId;
            orderDict[orderId] = [orderStatus, orderDetails, tableId];
        });

        //looping through orders
        for (const [key, details] of Object.entries(orderDict)) {
            const orderDetail = details[1][0];

            //creating html for an order container
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
            orderContainerHeader.appendChild(orderTitle);
            if (orderDetail.order.status == "Pending") {

                orderEditIcon.onclick = function () {
                    openEditOrderModel(orderDetail.orderId, orderDetail.order.tableId);
                }
                orderContainerHeader.appendChild(orderEditIcon);
            }
            orderUpperContainerElement.appendChild(orderContainerHeader);

            //looping through order details
            for (let i = 0; i < details[1].length; i++) {
                let item = details[1][i];
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
            const itemCountDiv = document.createElement("div");
            itemCountDiv.classList.add("item-count-container");
            itemCountDiv.innerHTML = `<div style="margin-left:10px">X${details[1].length} items</div>`;


            const editContainer = document.createElement("div");
            editContainer.classList.add("order-edit-container");

            //delete and status updating icons will only be rendered for the orders with the status "Pending"
            editContainer.innerHTML = `
                
               ${details[0] == "Pending" ?
                    `
                <div style="font-size:36px">
                    <i style='color: #DB79A9;' class='bi bi-trash' onclick="callDeleteOrder(${key})"></i>
                 </div>
                <div style="font-size:36px">
                    <i style="color: #DB79A9;" class="bi bi-x-square" onclick="callUpdateOrderStatus(${key},'Rejected')"></i>
                    <i style="color: #87B6A1;" class="bi bi-check-square" onclick="callUpdateOrderStatus(${key},'Completed')"></i>
                </div>
                ` : details[0] == "Completed" ? `
                <div style="font-size:36px">
                    <i style="color: #87B6A1;" class="bi bi-check-square">Completed</i>
                </div>

                `:
                        `<div style="font-size:36px">
                    <i style="color: #DB79A9;" class="bi bi-x-square" >Rejected</i>
                </div>`
                }`;

            itemCountDiv.appendChild(editContainer);
            orderContainerElement.appendChild(itemCountDiv);
            orderContainerList.appendChild(orderContainerElement);

        }
    }
    catch (error) {
        alert("Error loading orders.");
    } finally {
        hideLoader();
    }
}


//populates the order details within an order's container
async function loadOrderContent(orderId) {
    const orderContainerList = document.getElementById('order-detail-list');
    orderContainerList.innerHTML = "";

    try {
        orderDetails = orderDict[orderId];

        orderContainerList.innerHTML = `
        <button class="button" style="justify-self:right" type="button" onclick="addOrderDetailOnEdit()">
            <i style="color: white;font-size:24px" class="bi bi-plus-square"></i>
            Add Menu Item
        </button>`;

        //looping through order details
        for (const [key, details] of Object.entries(orderDetails[1])) {
            const orderDetail = details;

            //creating order detail html
            const orderElement = document.createElement("div");
            orderElement.classList.add("order");
            orderElement.innerHTML = `
                        <img id="order-image" src="images/food.png" />
                        <div id="order-detail">
                            <div class="order-detail-edit-container">
                                <div>
                                    <div>${orderDetail.menuItem.name}</div>
                                    <div>${orderDetail.menuItem.category.name}</div>
                                </div>
                                <i style="font-size:24px;color: #DB79A9;" class="bi bi-trash" onclick="callDeleteOrderDetail(${orderDetail.id})"></i>  
                            </div> 
                            <div id="price-quantity">
                                <div>\$${orderDetail.price}</div>
                                <div>Qty: ${orderDetail.quantity}</div>
                            </div>
                            <div style="display:flex;justify-content:flex-end; margin-top:10px">
                                <i style="font-size:24px;color:#87B6A1" class="bi bi-pencil-square" onclick="openEditOrderDetailModel(${orderDetail.id})"></i>  
                            </div>

                        </div>

                      
            `;
            orderContainerList.appendChild(orderElement);
        }
    }
    catch (error) {
        alert("Error loading order's content.");
    } finally {
        hideLoader();
    }
}

//shows the panel for adding order details
function addOrderDetailOnEdit() {
    hideElementById("order-detail-list");
    showElementById("add-menu-item-container");
    hideByClassName("order-button");
    showByClassName("order-detail-add-button");
}

//called when create order detail button is clicked
async function createOrderDetailOnEdit() {
    const menuSelect = document.getElementById("menu-item-select").querySelector("select");

    if (!menuSelect.value) {
        menuSelect.setCustomValidity('Cannot be left blank.');
        menuSelect.reportValidity();
        return;
    } else {
        menuSelect.setCustomValidity('');
    }
    const quantityInput = document.getElementById("menu-item-quantity").querySelector("input");
    const menu = await getMenuItem(menuSelect?.value);
    const data =
    {
        "quantity": Number(quantityInput.value),
        "price": menu.price,
        "orderId": orderEditing,
        "menuItemId": menu.id,
    }

    const orderDetailId = await postOrderDetail(data);

    //updating order dictionary for easy access
    const olderDetail = orderDict[orderEditing][1].findIndex(detail => detail.menuItemId == menu.id);
    if (olderDetail == -1) {
        orderDict[orderEditing][1].push({ ...data, id: orderDetailId, menuItem: menu });

    }
    else {
        let total = Number(orderDict[orderEditing][1][olderDetail].quantity) + Number(quantityInput.value);
        orderDict[orderEditing][1][olderDetail] = { ...orderDict[orderEditing][1][olderDetail], quantity: total }
    }
    loadOrderContent(orderEditing);
    cancelOrderDetail();
    quantityInput.value = 1;
}

//populates select element for table records
async function loadTables() {
    try {
        const tableSelect = document.getElementById("table-select");

        const response = await fetch('https://localhost:7238/Table/GetAll');
        const tables = await response.json();

        const selectElement = document.createElement("select");
        selectElement.setAttribute("id", "table-select-select");
        selectElement.setAttribute("name", "table");
        selectElement.setAttribute("oninvalid", "this.setCustomValidity('Cannot be left blank.')");
        selectElement.setAttribute("oninput", "this.setCustomValidity('')");

        selectElement.required = true;
        selectElement.innerHTML = '<option disabled selected value=""  >Choose a table</option>';

        for (const table of tables) {
            const optionElement = document.createElement("option");
            optionElement.setAttribute("value", table.id);
            optionElement.setAttribute("id", "menu-select-option");
            optionElement.innerText = `Table ${table.number}`;
            selectElement.appendChild(optionElement);
        }
        tableSelect.appendChild(selectElement);
    }
    catch (error) {
        alert("Error loading tables.");
    }
}

//populates select element for menu items
async function loadMenuItems(menuItemId = null) {
    try {
        const menuSelectElements = document.getElementsByClassName("menu-item-select");
        const response = await fetch('https://localhost:7238/MenuItem/GetAll');
        const menus = await response.json();

        //populating the div with the table select element
        for (const menuSelect of menuSelectElements) {
            
            menuSelect.innerHTML = "";
            const selectElement = document.createElement("select");
            selectElement.setAttribute("name", "menuItem");
            selectElement.setAttribute("oninvalid", "this.setCustomValidity('Cannot be left blank.')");
            selectElement.setAttribute("oninput", "this.setCustomValidity('')");
            selectElement.setAttribute("onchange", "showElementById('menu-item-quantity')");
            selectElement.innerHTML = `<option disabled ${menuItemId ? "" : "selected"} value="">Choose a menu</option>`;

            for (const item of menus) {
                const optionElement = document.createElement("option");
                optionElement.setAttribute("value", item.id);
                optionElement.innerText = item.name;
                if (menuItemId != null && item.id == menuItemId) {
                    optionElement.setAttribute("selected", "selected");
                }
                selectElement.appendChild(optionElement);
            }
            menuSelect.appendChild(selectElement);
        }
    }
    catch (error) {
        alert("Error loading menu items.");
    }
}

// get menu item by id
async function getMenuItem(id) {
    try {
        const response = await fetch(`https://localhost:7238/MenuItem/Get/${id}`);
        const menuItem = await response.json();
        return menuItem;
    }
    catch (error) {
        alert("Error getting menu item.")
    }
}

//get order detail by id
async function getOrderDetail(id) {
    try {
        const response = await fetch(`https://localhost:7238/OrderDetail/GetNested/${id}`);
        const menuItem = await response.json();
        return menuItem;
    }
    catch (error) {
        alert("Error getting order detail.")
    }
}

//shows the panel for creating an order
function openModal() {

    const editOrderTitle = document.getElementsByClassName("edit-modal-title")[0];
    editOrderTitle.innerText = "Create Order";

    const editButton = document.getElementById("modal-submit-button");
    editButton.innerText = "Create Order";

    const editModal = document.getElementsByClassName("edit-modal")[0];
    editModal.classList.remove("hidden");

    hideElementById("order-detail-list");
    hideByClassName("order-container-list");
    showElementById("add-menu-item-container");
    hideElementById("new-order-button");
    hideElementById("new-order-button");

    //resetting the inputs beforehand
    const menuSelect = document.getElementById("menu-item-select").querySelector("select");
    menuSelect.value = "";
    const quantity = document.getElementById("menu-item-quantity").querySelector("input");
    quantity.value = "1";
}

function hideModal() {
    const editModal = document.getElementsByClassName("edit-modal")[0];
    editModal.classList.add("hidden");
}

loadOrders();
loadTables();
loadMenuItems();


function cancelOrder() {
    const orderCreateForm = document.getElementById("order-upper-container");
    orderCreateForm.reset();
    const editOuterContainer = document.getElementById("edit-menu-item-container");
    editOuterContainer.innerHTML = "";
    hideModal();
    showByClassName("order-container-list");
    loadOrders();
    hideElementById("add-menu-item-container");
    hideElementById("menu-item-quantity");
    showElementById("new-order-button");
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

        const responseData = await response.json();
        return responseData.orderId;
    } catch (error) {
        alert("Error posting order.");
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

        const responseData = await response.json();
        return responseData.orderDetailId;
    } catch (error) {
        alert("Error posting order detail.");
        return null;
    }
}



function updateOrder(data) {
    try {
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
    } catch (error) {
        alert("Error updating order.");
    }
}

function updateOrderDetail(data) {
    try {

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
    } catch (error) {
        alert("Error updating order detail.");
    }
}

function processOrder(event) {
    const editOrderTitle = document.getElementsByClassName("edit-modal-title")[0];
    if (editOrderTitle.innerText.includes("Edit")) {
        editOrder(event);
    }
    else {
        createOrder(event);
        const menuSelect = document.getElementById("menu-item-select").querySelector("select");
    }
}

//called when create order button is clicked
async function createOrder(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const tableId = formData.get("table");

    let data = { "TableId": tableId, "Status": "Pending" };
    const orderId = await postOrder(data);


    const menuSelect = document.getElementById("menu-item-select").querySelector("select");

    if (!menuSelect.value) {
        menuSelect.setCustomValidity('Cannot be left blank.');
        menuSelect.reportValidity();
        return;
    } else {
        menuSelect.setCustomValidity('');
    }

    const menuItemId = formData.get("menuItem");
    const menuItem = await getMenuItem(menuItemId);
    const quantity = formData.get("quantity");

    data =
    {
        "MenuItemId": Number(menuItemId),
        "Quantity": Number(quantity),
        "Price": menuItem.price,
        "OrderId": orderId
    };
    await postOrderDetail(data);

    hideModal();
    hideElementById("menu-item-quantity");
    window.location.reload();
    showLoader();
    showElementById("new-order-button");
}

async function deleteOrder(orderId) {

    try {
        const response = await fetch(`https://localhost:7238/Order/Delete/${orderId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        alert("Error deleting order.");
        return null;
    }
    finally {
        window.location.reload();
        showLoader();
    }
}
async function deleteOrderDetail(detailId) {

    try {
        const response = await fetch(`https://localhost:7238/OrderDetail/Delete/${detailId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const responseData = await response.json();

        //updating order dictionary for consistency
        const deletedDetail = orderDict[orderEditing][1].findIndex(detail => detail.id == detailId);
        orderDict[orderEditing][1].splice(deletedDetail, 1);

        return responseData;
    }
    catch (error) {
        alert("Error deleting order detail.");
        return null;
    }
    finally {
        cancelOrder();
    }
}
function editOrder(event) {
    event.preventDefault();

    const orderForm = document.getElementById("order-upper-container");
    const form = new FormData(orderForm);
    const tableId = form.get("table");

    const data = {
        id: orderEditing,
        tableId: tableId
    };
    updateOrder(data);
    cancelOrder();
    showLoader();
    window.location.reload();
}

//shows the panel for editing an order
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
    showElementById("order-detail-list");
    hideByClassName("order-container-list");
    loadOrderContent(orderId);
    hideElementById("new-order-button");
    const menuSelect = document.getElementById("menu-item-select").querySelector("select");
    menuSelect.value = "";
    const quantity = document.getElementById("menu-item-quantity").querySelector("input");
    quantity.value = "1";
}

//shows the panel for editing an order detail
async function openEditOrderDetailModel(id) {
    const orderDetail = await getOrderDetail(id);

    hideElementById("order-detail-list");
    hideByClassName("order-button");
    showByClassName("order-detail-button");
    hideByClassName("order-detail-add-button");
    hideByClassName("select-container");
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
    orderDetailEditing = orderDetail;
}

function cancelOrderDetail() {
    showElementById("order-detail-list");
    showByClassName("order-button");
    hideByClassName("order-detail-button");
    hideByClassName("order-detail-add-button");
    showByClassName("select-container");
    hideElementById("add-menu-item-container");

    const editOuterContainer = document.getElementById("edit-menu-item-container");
    editOuterContainer.classList.add("hidden");
    editOuterContainer.innerHTML = "";

    const menuSelect = document.getElementById("menu-item-select").querySelector("select");
    menuSelect.value = "";
    const quantity = document.getElementById("menu-item-quantity").querySelector("input");
    quantity.value = "1";

}

async function editOrderDetail() {

    const menuSelect = document.getElementById("edit-menu-item-select").querySelector("select");
    const quantityInput = document.getElementById("menu-edit-quantity");

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

    //updating order dictionary for consistency
    const updatedDetail = orderDict[orderDetailEditing.orderId][1].findIndex(detail => detail.id == orderDetailEditing.id);
    const olderDetail = orderDict[orderEditing][1].findIndex(detail => detail.id != orderDetailEditing.id && detail.menuItemId == menu.id);

    //no older items are found with the menu item data is being updated to
    if (olderDetail == -1) {
        orderDict[orderDetailEditing.orderId][1][updatedDetail] = { ...orderDict[orderDetailEditing.orderId][1][updatedDetail], menuItemId: menu.id, menuItem: menu, quantity: data.quantity };
    }
    //updating the older target menu item's quantity and removing the detail with the older menu item
    else {
        let total = Number(orderDict[orderEditing][1][olderDetail].quantity) + Number(quantityInput.value);
        orderDict[orderEditing][1][olderDetail] = { ...orderDict[orderEditing][1][olderDetail], quantity: total }
        orderDict[orderEditing][1].splice(updatedDetail, 1);
    }


    loadOrderContent(orderDetailEditing.orderId);
    cancelOrderDetail();
}

//operation confirmations
function callDeleteOrder(id) {
    const res = confirm("Are you sure to delete?");
    if (res) {
        deleteOrder(id);
    }
}

function callDeleteOrderDetail(id) {
    const res = confirm("Are you sure to delete?");
    if (res) {
        if (orderDict[orderEditing][1].length == 1) {
            const resToOrder = confirm("You are about to delete the last menu item. Related order will also be deleted. Are you sure?");
            if (resToOrder) {
                deleteOrder(orderEditing);
            }
        }
        else {
            deleteOrderDetail(id);
        }
    }
}


function callUpdateOrderStatus(orderId, _status) {
    const res = confirm("Rejected or completed orders cannot be deleted. Are you sure to proceed?");
    if (res) {
        const data = {
            id: orderId,
            status: _status,
            tableId: orderDict[orderId][2]
        };

        updateOrder(data);
        orderDict[orderId][0] = _status;
        showLoader();
        hideByClassName("order-container-list");
        window.location.reload();
    }
}

const orderCreateForm = document.getElementById("order-upper-container");
orderCreateForm?.addEventListener("submit", processOrder);

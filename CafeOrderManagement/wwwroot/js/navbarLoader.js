function loadNavBar() {
    const nav = document.getElementById("navbar");
    navbar.innerHTML = `
    <nav>
        <div id="logo" >
            <img src="images/Logo text.jpg" onclick="navigateHome()"/>
        </div >
        <div id="menu-list">
            <div class="menu-item" onclick="toggleMenuItem(this)">
                <i class="bi bi-house" style="font-size:28px;"></i>
                <a id="menu-text" href="#">HOME</a>
            </div>
            <div class="menu-item" onclick="toggleMenuItem(this)">
                <i class="bi bi-arrow-counterclockwise" style="font-size: 28px; "></i>
                <a id="menu-text" href="/orderDetail.html">MENU 1</a>
            </div>
            <div class="menu-item" onclick="toggleMenuItem(this)">
                <i class="bi bi-envelope" style="font-size: 28px; "></i>
                <a id="menu-text" href="#">MENU 2</a>
            </div>
            <div class="menu-item" onclick="toggleMenuItem(this)">
                <i class="bi bi-bar-chart-line" style="font-size: 28px; "></i>
                <a id="menu-text" href="#">MENU 3</a>
            </div>
            <div class="menu-item" onclick="toggleMenuItem(this)">
                <i class="bi bi-dice-5" style="font-size: 28px; "></i>
                <a id="menu-text" href="#">MENU 4</a>
            </div>
            <div class="menu-item" onclick="toggleMenuItem(this)">
                <i class="bi bi-sliders" style="font-size: 28px;"></i>
                <a id="menu-text" href="#">MENU 5</a>
            </div>

        </div>
    </nav > `;
}

function navigateHome() {
    window.location.href = '/index.html';
}

loadNavBar();

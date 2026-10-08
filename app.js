 const mockOrders = [
      { id: "ORD-8921", customer: "Vaidesh K.", table: "T-04", total: "₹180", date: "Today, 06:15 PM" },
      { id: "ORD-8922", customer: "Amisha K.", table: "T-02", total: "₹240", date: "Today, 06:22 PM" },
      { id: "ORD-8923", customer: "Aditya K.", table: "T-08", total: "₹110", date: "Today, 06:28 PM" }
    ];

    let mockMenuItems = [
      { name: "Adrak Masala Chai", category: "Hot Beverages", price: "40", badgeClass: "cat-hot", desc: "Freshly brewed ginger infused tea." },
      { name: "Cold Coffee with Ice Cream", category: "Cold Beverages", price: "120", badgeClass: "cat-cold", desc: "Rich blended coffee topped with vanilla." },
      { name: "Bun Maska", category: "Snacks & Quick Bites", price: "60", badgeClass: "cat-snack", desc: "Classic toasted bun with fresh butter." }
    ];

    function handleLogin() {
      document.getElementById('login-section').classList.add('hidden');
      document.getElementById('dashboard-section').classList.remove('hidden');
      renderOrders();
      renderMenu();
    }

    function handleLogout() {
      document.getElementById('dashboard-section').classList.add('hidden');
      document.getElementById('login-section').classList.remove('hidden');
    }

    function switchTab(tabName) {
      document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));

      if (tabName === 'orders') {
        document.getElementById('btn-tab-orders').classList.add('active');
        document.getElementById('tab-orders').classList.add('active');
      } else {
        document.getElementById('btn-tab-menu').classList.add('active');
        document.getElementById('tab-menu').classList.add('active');
      }
    }

    function renderOrders() {
      const tbody = document.getElementById('orders-body');
      tbody.innerHTML = mockOrders.map(o => `
        <tr>
          <td class="order-id">${o.id}</td>
          <td><strong>${o.customer}</strong></td>
          <td><span class="table-no">${o.table}</span></td>
          <td class="amount">${o.total}</td>
          <td style="color:var(--gray-400);">${o.date}</td>
          <td><button class="btn btn-danger btn-sm" onclick="this.closest('tr').remove()">Complete</button></td>
        </tr>
      `).join('');
    }

    function renderMenu() {
      const list = document.getElementById('menu-list');
      document.getElementById('menu-count').innerText = `${mockMenuItems.length} Items`;
      
      list.innerHTML = mockMenuItems.map((item, index) => `
        <div class="menu-item-row">
          <div class="menu-item-info">
            <h4>${item.name} <span class="cat-badge ${item.badgeClass}">${item.category}</span></h4>
            <div class="meta">${item.desc}</div>
          </div>
          <div style="display:flex; align-items:center;">
            <span class="menu-item-price">₹${item.price}</span>
            <button class="btn btn-ghost btn-sm" onclick="deleteMenuItem(${index})">🗑</button>
          </div>
        </div>
      `).join('');
    }

    function addMenuItem(e) {
      e.preventDefault();
      const name = document.getElementById('menu-name').value;
      const category = document.getElementById('menu-category').value;
      const price = document.getElementById('menu-price').value;
      const desc = document.getElementById('menu-description').value;

      let badgeClass = 'cat-hot';
      if(category.includes('Cold')) badgeClass = 'cat-cold';
      if(category.includes('Snacks')) badgeClass = 'cat-snack';
      if(category.includes('Desserts')) badgeClass = 'cat-dessert';

      mockMenuItems.unshift({ name, category, price, badgeClass, desc });
      renderMenu();
      document.getElementById('menu-form').reset();
    }

    function deleteMenuItem(index) {
      mockMenuItems.splice(index, 1);
      renderMenu();
    }
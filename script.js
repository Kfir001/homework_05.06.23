// רשימת קניות ריקה
let shoppingList = [];

// פונקציה שמתבצעת כאשר הדף נטען
window.onload = function () {
  // בדיקה אם ישנה רשימת קניות באחסון מקומי
  if (localStorage.getItem("shoppingList")) {
    // אם כן, שחזור הרשימה מהאחסון המקומי והצגתה
    shoppingList = JSON.parse(localStorage.getItem("shoppingList"));
    displayList();
  }
};

// פונקציה להוספת פריט לרשימת הקניות
function addItem() {
  // איתור שדה הקלט לפריט
  const itemInput = document.getElementById("itemInput");
  // בדיקה אם השדה לא ריק
  if (itemInput.value) {
    // אם לא ריק, הוספת הערך לרשימת הקניות
    shoppingList.push(itemInput.value);
    // איפוס שדה הקלט
    itemInput.value = "";
    // שמירת הרשימה באחסון מקומי
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
    // הצגת הרשימה המעודכנת
    displayList();
  }
}

// פונקציה להצגת רשימת הקניות
function displayList() {
  // איתור אלמנט הרשימה בדף
  const shoppingListElement = document.getElementById("shoppingList");
  // איפוס האלמנט
  shoppingListElement.innerHTML = "";
  // לולאה על כל הפריטים ברשימת הקניות
  for (let i = 0; i < shoppingList.length; i++) {
    // יצירת אלמנט li לכל פריט
    const listItem = document.createElement("li");
    // הוספת תוכן לאלמנט - תיבת סימון ותווית עם שם הפריט
    listItem.innerHTML = `<input type='checkbox' id='item${i}' /><label for='item${i}'>${shoppingList[i]}</label> <button onclick="deleteItem('${shoppingList[i]}')">✖</button>`;
    // הוספת האלמנט לרשימה בדף
    shoppingListElement.appendChild(listItem);
  }
}

// פונקציה למחיקת הפריטים המסומנים
function deleteSelected() {
  // איתור כל התיבות המסומנות
  const checkedItems = document.querySelectorAll(
    "input[type=checkbox]:checked"
  );
  // לולאה על כל התיבות המסומנות
  for (let i = 0; i < checkedItems.length; i++) {
    // איתור מיקום הפריט ברשימת הקניות
    const index = shoppingList.indexOf(checkedItems[i].nextSibling.textContent);
    // אם הפריט נמצא ברשימה
    if (index > -1) {
      // מחיקתו מהרשימה
      shoppingList.splice(index, 1);
    }
  }
  // שמירת הרשימה המעודכנת באחסון מקומי
  localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
  // הצגת הרשימה המעודכנת
  displayList();
}

// פונקציה למחיקת פריט ישירות מהרשימה מבלי לסמן אותו למחיקה
function deleteItem(item) {
  // מציאת האינדקס של הפריט במערך shoppingList
  const index = shoppingList.indexOf(item);

  // אם הפריט נמצא במערך
  if (index > -1) {
    // הסרתו מהמערך
    shoppingList.splice(index, 1);

    // שמירת הרשימה המעודכנת באחסון מקומי
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));

    // הצגת הרשימה המעודכנת
    displayList();
  }
}

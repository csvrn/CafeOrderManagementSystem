# Cafe Order Management System

This system will ensure that orders are taken, managed, and tracked effectively within the cafe.

It is built using .NET, Javascript, HTML, CSS, and SQL Server.

You can access UML diagram, SQL scripts, and API requests from the documents folder.

## Table of Contents:

1. Project Structure
1. Prerequisites
1. Project Setup
2. Additional Information

## 1. Project Structure:

### **1.Database Schema Design:**

#### **UML Class Diagram:**

![UML Class Diagram](/Documents/UML/CafeOrderManagementUML.jpg)

#### **Entities:**

1. **Categories:**

   - **Id:** int (Primary Key, Identity)

   - **Name:** nvarchar(255) (Unique, Not Null)

   **Relationships:** Linked to MenuItems through a foreign key relationship for categorization of menu items.

2. **MenuItems:**

   - **Id:** int (Primary Key, Identity)

   - **Name:** nvarchar(255) (Unique, Not Null)

   - **Price:** float (Not Null)

   - **Stock:** int (Nullable)

   - **CategoryId:** int (Foreign Key, Not Null)

   **Relationships:** Linked to OrderDetails through a foreign key.

   **Indexes:** Includes an index on CategoryId, Price and both of them for performance optimization.

3. **Orders:**

   - **Id:** int (Primary Key, Identity)

   - **Status:** nvarchar(255) (Not Null) - Current status of the order: Pending, Completed, Rejected.

   - **TableId:** int (Foreign Key, Not Null)

   **Relationships:** Related to OrderDetails and Payments for tracking order contents and payment information.

   **Indexes:** Includes an index on Status, TableId and both of them for performance optimization.

4. **OrderDetails:**

   - **Id:** int (Primary Key, Identity)

   - **Quantity:** int (Not Null) - Number of units for the menu items in the order.

   - **Price:** float (Not Null) - Price of the menu item at the time of ordering, beneficial in case of price updates.

   - **OrderId:** int (Foreign Key, Not Null)

   - **MenuItemId:** int (Foreign Key, Not Null)

   **Indexes:** Includes indexes on OrderId and MenuItemId to enhance query performance.

5. **Payments:**

   - **Id:** int (Primary Key, Identity)

   - **Amount:** float (Not Null) - Total amount paid for an order.

   - **PaymentDate:** datetime (Not Null) - Date and time of the payment.

   - **OrderId:** int (Foreign Key, Unique, Not Null)

   **Indexes:** Indexes on OrderId and PaymentDate for efficient payment tracking.

6. **Tables:**

   - **Id:** int (Primary Key, Identity) - Unique identifier for each table in the café.

   - **Number:** int (Unique, Not Null) - Number assigned to the table.

   - **Status:** nvarchar(255) (Not Null) - Current status of the table: Empty, Occupied, Reserved.

   **Indexes:** Includes an index on Number, Status and both of them for performance optimization.

### **Relationships Overview:**

- **Categories and MenuItems:** A one-to-many relationship, where each category can have multiple menu items.

- **MenuItems and OrderDetails:** A many-to-one relationship, as each order detail references one menu item and a menu item can be in multiple order details.

- **Orders and OrderDetails:** A one-to-many relationship, where each order can contain multiple order details.

- **Orders and Payments:** A one-to-one relationship, linking each order to a payment.

- **Orders and Tables:** A many-to-one relationship, associating each order with a specific table.

## 2.Prerequisites:

**Ensure you have installed:**

- .NET SDK (initially used 8.0.403)
- SQL Server (used 16.0.1000.6)
- Browser for testing the front-end
- Visual Studio 2022 (.NET SDK version 8.0.4xx requires MSBuild/Visual Studio version 17.11, you can use Visual Studio 2022.)

To prevent dependency issues, you can install the versions I have used in development.

- If you have different .NET SDK versions installed on your machine and you want to specify another:
  - Create a **global.json** file with your preferred SDK version and place it under the solution itself:
    `{
    "sdk": {
        "version": "8.0.403"
    }
}`

You can install SQL Server and preferably Microsoft SQL Server Management Studio by following the instructions in [Install SQL Server Management Studio in 2 minutes](https://www.youtube.com/watch?v=7zXtA0LwoHs&ab_channel=AndersJensen). **(Do not forget to check trust certification box.)**

## 3. Project Setup:

1. Configure your connection string in **appsettings.json** under the project named **CafeOrderManagement**. Enter your server name used for SQL Server.
   `"ConnectionStrings": {
    "DefaultConnection": "Server=;Database=CafeOrderManagement;Trusted_Connection=True;TrustServerCertificate=True"
}`

2. Connect to your database server from your database management tool (Microsoft SQL Server Management Studio).

3. Build the solution from the **Solution Explorer** (View >> Solution Explorer).

4. Open **Package Manager Console** (Tools >> NuGet Package Manager >> Package Manager Console)

5. Choose **CafeOrderManagement.DataAccess** as your **default project**.

6. Run `update-database` command to create a database on your server.

7. Run `add-migration initialMigration` to create the initial migration. You can name it differently according to your preference by changing `initialMigration`. This creates a new migration file that reflects changes in your model by generating code to update the database schema using Entity Framework Core.

8. Run `update-database` again to apply your initial migration. You can view the changes by refreshing your database now.

9. You can run the project. (In case your browser's internet security settings cause trouble, try accessing the address from incognito mode. **Do not close the first browser window that opens when the project runs**, that causes the project to stop running assuming you have closed the application.)

## 4. Additional Information:
- If you would like to use MySQL instead of SQL Server, you can view this link: [MySQL connection in .NET Core 8 MVC](https://medium.com/@Mohammed_Taherali/mysql-connection-in-net-core-8-mvc-86c71c3613fd)
- If you would like to use Oracle instead of SQL Server, you can view this link: [Getting started with ASP.NET Core Web Application using Oracle](https://github.com/mahedee/articles/blob/master/dot-net-core/Getting-started-with-ASPNET-Core-Web-Application-using-Oracle.md).
 

//// 1) Category

// <%  data.forEach(function(item){  %>
//     <tr>
//         <td><%= item.category_id%></td>
//         <td><img width="50px" height="50px" src=<%= item.category_img_url%>></td>
//         <td><%= item.category_name%></td>
//         <td><%= item.category_status%></td>
//         <td><a class=' btn btn-warning'
//                 href='/category/update/<%= item.document_id%>'>Click To
//                 Update </a></td>
//         <td><a class='mylink btn btn-danger' u_id='<%= item.document_id%>'
//                 href='/category/delete/<%= item.document_id%>'>Click To Delete </a>
//         </td>
//     </tr>
//     <%  }) %>

//// 2) Product

// <%  data.forEach(function(item){  %>
//     <tr>
//         <td><%= item.id%></td>
//         <td><img width="50px" height="50px" src="/images/<%= item.image%>"></td>
//         <td><%= item.name%></td>
//         <td><%= item.categoryName %></td>
//         <td><%= item.comp_name%></td>
//         <td><%= item.descr%></td>
//         <td><%= item.stock%></td>
//         <td><a class=' btn btn-warning' href='/product/update/<%= item.id%>'>Click To Update </a></td>
//         <td><a class='mylink btn btn-danger' u_id='<%= item.id%>' href='/product/delete/<%= item.id%>'>Click To Delete </a>
//         </td>
//     </tr>
//     <%  }) %>

////// 3) User
// <% data.forEach(function(item){ %>
//     <tr>
//       <td><%= item.id%></td>
//       <td><%= item.name%></td>
//       <td><%= item.email%></td>
//       <td><%= item.phone%></td>
//       <td><%= item.city_name%></td>
//       <td><%= item.password%></td>
//       <td>
//         <a
//           class="mylink btn btn-danger"
//           u_id="<%= item.id%>"
//           href="/user/delete/<%= item.id%>"
//           >Click To Delete
//         </a>
//       </td>
//     </tr>
//     <% }) %>

/////// 4)Supplier
// <% data.forEach(function(item){ %>
//     <tr>
//       <td><%= item.id%></td>
//       <td><%= item.name%></td>
//       <td><%= item.comp_name%></td>
//       <td><%= item.email%></td>
//       <td><%= item.mobile%></td>
//       <td><%= item.address%></td>
//       <td><%= item.city%></td>
//       <td><%= item.gstin%></td>
//       <td><%= item.descr%></td>
//       <td>
//         <a
//           class=" btn btn-warning"
//           href="/supplier/update/<%= item.id%>"
//           >Click To Update
//         </a>
//       </td>
//       <td>
//         <a
//           class="mylink btn btn-danger"
//           u_id="<%= item.id%>"
//           href="/supplier/delete/<%= item.id%>"
//           >Click To Delete
//         </a>
//       </td>
//     </tr>
//     <% }) %>


/////// 5) Order/new
// <%  data.forEach(function(item){  %>
//     <% if (item.status_code==100) { %>
// <tr>
//     <td><%= item.id%></td>
//     <td><%= item.use_name%></td>
//     <td><%= item.total%></td>
//     <td><%= item.date%></td>
//     <td><%= item.time%></td>
//     <td><%= item.address%></td>
//     <input type="hidden" id="user_city_id" value="<%=item.city_id %>">
//     <td><%= item.city_name%></td>
//     <td>
//             <% if (item.status_code==100) { %>
//                 <p>pending</p>
//             <% } else if(item.status_code==200){ %>
//                 <p>assigned</p>
//             <% } else if (item.status_code==300) { %>
//                 <p>picked</p>
//             <% } else if(item.status_code==400){ %>
//                 <p>on the way</p>
//             <% } else if (item.status_code==500) { %>
//                 <p>delievered</p>
//             <% } else if (item.status_code==600){ %>
//                 <p>cancelled</p>
//             <% } %>
//     </td> 
//     <form action="/orders/update_submit" method="post">
                                                                    
//     <!-- <td><select
//         class="custom-select"
//         name="status_code"
//       >
//         <option value="100">pending</option>
//         <option value="200">Assigned</option>
//         <option value="300">Picked</option>
//         <option value="400">On the way</option>
//         <option value="500">Delievered</option>
//         <option value="600">Cancelled</option>
//       </select></td> -->
//       <td><select
//         class="custom-select delieveries"
//         name="delievery"
//         id="delieveries"
//       >
//         <option disabled selected>Select Delievery person</option>
        
//       </select></td>
       
//       <td><button type="submit" name="ord_id" value="<%=item.id%>" class="btn btn-warning">Update</button></td>
//       </form>
//     <td><a class = 'mylink btn btn-danger' u_id = '<%= item.id%>' href='/orders/delete/<%= item.id%>'>Click To Delete </a></td>
// </tr>
// <%  } %> 
// <%  }) %> 
         

// <center>
// <div class="container">
//   <div class="col-lg-2 col-md-2">
//     <div class="logo">
//       <a href="/user/shop">
//         <table>
//           <tr>
//             <td class="text-center">
//               <h5><b>MARKET AT DOOR</b></h5>
//             </td>
//           </tr>
//           <tr>
//             <td class="text-center">
//               <img src="/img_ui/logo2.png" alt="" />
//             </td>
//           </tr>
//         </table>
//       </a>
//     </div>
//   </div>
// </div>
// </center>
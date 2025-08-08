import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../assets/logo.jpg";

export const generateInvoice = async (order, autoDownload = false) => {
  const doc = new jsPDF();

  // 🎨 Colors
  const primaryColor = [41, 128, 185];
  const secondaryColor = [52, 73, 94];
  const lightGray = [236, 240, 241];
  const darkGray = [127, 140, 141];

  // 🖼️ Load Logo
  const img = new Image();
  img.src = logo;
  await new Promise((resolve) => (img.onload = resolve));
  doc.addImage(img, "JPEG", 15, 15, 20, 20);

  // 🏢 Company Info
  doc.setFontSize(24).setFont("helvetica", "bold").setTextColor(...primaryColor);
  doc.text("Nari Vastaram", 45, 25);

  doc.setFontSize(10).setFont("helvetica", "normal").setTextColor(...secondaryColor);
  doc.text("Traditional Ladies Clothing", 45, 32);
  doc.text("Email: support@narivastaram.com", 45, 38);
  doc.text("Phone: +91 9942215592", 45, 44);
  doc.text("GSTIN: 10AXWPG6000H1ZT", 45, 50);

  // 🧾 Invoice Title & Box
  doc.setFontSize(28).setFont("helvetica", "bold").setTextColor(...primaryColor);
  doc.text("INVOICE", 150, 25);

  doc.setFillColor(...lightGray);
  doc.rect(150, 30, 45, 25, 'F');

  doc.setFontSize(9).setFont("helvetica", "bold").setTextColor(...secondaryColor);
  doc.text("Invoice No:", 152, 36);
  doc.text("Date:", 152, 42);
  doc.text("Due Date:", 152, 48);

  doc.setFont("helvetica", "normal");
  doc.text(`INV-${order._id.slice(-8).toUpperCase()}`, 152, 40);
  doc.text(new Date(order.createdAt).toLocaleDateString(), 152, 46);
  doc.text(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(), 152, 52);

  // 💌 Bill To
  doc.setFontSize(12).setFont("helvetica", "bold").setTextColor(...primaryColor);
  doc.text("BILL TO:", 15, 70);

  doc.setFontSize(11).setFont("helvetica", "normal").setTextColor(...secondaryColor);
  doc.text(`${order.user?.firstName ?? ""} ${order.user?.lastName ?? ""}`, 15, 78);
  doc.text(`Email: ${order.user?.email ?? "N/A"}`, 15, 85);
  doc.text(`Phone: ${order.shippingAddress?.mobile ?? "N/A"}`, 15, 92);

  // 📦 Shipping Address
  let addressEndY = 102;
  if (order.shippingAddress) {
    doc.setFont("helvetica", "bold").text("Shipping Address:", 15, 102);
    doc.setFont("helvetica", "normal");
    const addressLines = (order.shippingAddress.streetAddress ?? "").split('\n');
    let y = 109;
    addressLines.forEach(line => {
      doc.text(line.trim(), 15, y);
      y += 8;
    });
    doc.text(`${order.shippingAddress.city ?? ""}, ${order.shippingAddress.state ?? ""} ${order.shippingAddress.pinCode ?? ""}`, 15, y + 5);
    addressEndY = y + 15;
  }

  // 📦 Order Status
  doc.setFontSize(10).setFont("helvetica", "bold").setTextColor(...primaryColor);
  doc.text("ORDER STATUS:", 150, 70);
  doc.setFont("helvetica", "normal").setTextColor(...secondaryColor);
  doc.text(order.orderStatus?.toUpperCase() ?? "PENDING", 150, 78);
  doc.text(`Payment: ${order.paymentDetails?.paymentStatus?.toUpperCase() ?? "PENDING"}`, 150, 85);

  // 📄 Product Table
  const tableStartY = addressEndY;
  autoTable(doc, {
    startY: tableStartY,
    head: [["#", "Product Description", "Size", "Qty", "Unit Price", "Amount"]],
    body: order.orderItems.map((item, index) => [
      (index + 1).toString(),
      item.product?.title ?? "N/A",
      item.size ?? "-",
      item.quantity ?? 1,
      `${(item.product?.price ?? 0).toLocaleString()}`,
      `${(item.quantity * (item.product?.price ?? 0)).toLocaleString()}`,
    ]),
    styles: { fontSize: 9, cellPadding: 4, textColor: secondaryColor },
    headStyles: { fillColor: primaryColor, textColor: [255, 255, 255], fontSize: 10, fontStyle: 'bold' },
    columnStyles: {
      0: { cellWidth: 10, halign: "center" },
      1: { cellWidth: 70 },
      2: { cellWidth: 20, halign: "center" },
      3: { cellWidth: 15, halign: "center" },
      4: { cellWidth: 25, halign: "right" },
      5: { cellWidth: 25, halign: "right" },
    },
    alternateRowStyles: { fillColor: [249, 249, 249] },
    margin: { left: 15, right: 15 }
  });

  const finalY = doc.lastAutoTable.finalY + 15;

  // 💰 Summary
  const summaryX = 130;
  const summaryWidth = 65;

  doc.setFillColor(...lightGray);
  doc.rect(summaryX - 5, finalY - 5, summaryWidth, 35, 'F');

  doc.setFontSize(10).setFont("helvetica", "normal").setTextColor(...secondaryColor);
  doc.text("Subtotal:", summaryX, finalY);
  doc.text(`${order.totalPrice.toLocaleString()}`, summaryX + 55, finalY, { align: "right" });

  doc.text("Discount:", summaryX, finalY + 7);
  doc.text(`${order.discount.toLocaleString()}`, summaryX + 55, finalY + 7, { align: "right" });

  const tax = order.tax ?? 0;
  if (tax > 0) {
    doc.text("Tax (GST):", summaryX, finalY + 14);
    doc.text(`${tax.toLocaleString()}`, summaryX + 55, finalY + 14, { align: "right" });
  }

  doc.setFont("helvetica", "bold").setFontSize(12).setTextColor(...primaryColor);
  const totalY = tax > 0 ? finalY + 21 : finalY + 14;
  doc.text("TOTAL:", summaryX, totalY);
  doc.text(`${order.totalDiscountedPrice.toLocaleString()}`, summaryX + 55, totalY, { align: "right" });

  // 📜 Terms & Conditions
  const termsY = totalY + 20;
  doc.setFontSize(9).setFont("helvetica", "bold").setTextColor(...secondaryColor);
  doc.text("Terms & Conditions:", 15, termsY);

  doc.setFont("helvetica", "normal").setFontSize(8).setTextColor(...darkGray);
  doc.text("• All sales are final. Returns accepted within 7 days of delivery.", 15, termsY + 6);
  doc.text("• Items must be in original condition with tags attached.", 15, termsY + 11);
  doc.text("• Payment is due within 30 days of invoice date.", 15, termsY + 16);

  // 💌 Footer
  const footerY = termsY + 30;
  doc.setDrawColor(...primaryColor);
  doc.line(15, footerY, 195, footerY);

  doc.setFontSize(9).setTextColor(...darkGray);
  doc.text("Thank you for choosing Nari Vastaram. For any queries, contact us at support@narivastaram.com", 105, footerY + 8, { align: "center" });

  doc.setFontSize(8);
  doc.text("Page 1 of 1", 195, footerY + 15, { align: "right" });

  if (autoDownload) {
    doc.save(`Invoice-${order._id}.pdf`);
    return;
  }

  const blob = doc.output("blob");
  return URL.createObjectURL(blob);
};

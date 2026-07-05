var BIZ = "Ahmed Chai House";
var M = [
  {
    id: 1,
    n: "Avocado Toast",
    d: "Smashed avocado on artisan sourdough with chili flakes, microgreens & olive oil",
    p: 320,
    i: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400",
    v: 1,
  },
  {
    id: 2,
    n: "Classic Crepe",
    d: "Thin French crepe with Nutella, fresh strawberries & powdered sugar",
    p: 280,
    i: "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=400",
    v: 1,
  },
  {
    id: 3,
    n: "Chicken Sandwich",
    d: "Grilled chicken breast with pesto mayo, sun-dried tomatoes & arugula",
    p: 350,
    i: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400",
    v: 0,
  },
  {
    id: 4,
    n: "Hot Chocolate",
    d: "Rich Belgian hot chocolate topped with whipped cream",
    p: 220,
    i: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400",
    v: 1,
  },
  {
    id: 5,
    n: "Cappuccino",
    d: "Double shot espresso with steamed milk & chocolate dusting",
    p: 180,
    i: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400",
    v: 1,
  },
  {
    id: 6,
    n: "Caesar Salad",
    d: "Crisp romaine, parmesan, croutons & house dressing",
    p: 290,
    i: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400",
    v: 1,
  },
  {
    id: 7,
    n: "Grilled Fish",
    d: "Pan-seared fish with lemon butter & mashed potatoes",
    p: 420,
    i: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400",
    v: 0,
  },
  {
    id: 8,
    n: "Iced Latte",
    d: "Double espresso over ice with chilled milk",
    p: 200,
    i: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400",
    v: 1,
  },
];
var P = [
  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600",
  "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=600",
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600",
  "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=600",
  "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=600",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600",
];
var CK = BIZ.replace(/\s+/g,"_").toLowerCase();
var C = JSON.parse(localStorage.getItem(CK+"_c") || "[]"),
  O = JSON.parse(localStorage.getItem(CK+"_o") || "[]"),
  AT = "orders";
if (O.length < 1) {
  O = [
    {
      id: "ORD-A1B2C3",
      nm: "Demo Customer",
      ph: "+92 300 0000000",
      it: [
        { n: "Avocado Toast", p: 320, q: 2 },
        { n: "Cappuccino", p: 180, q: 2 },
      ],
      t: 1000,
      s: "done",
      tm: "10:30 AM",
    },
  ];
}
function SV() {
  localStorage.setItem(CK+"_c", JSON.stringify(C));
  localStorage.setItem(CK+"_o", JSON.stringify(O));
  RA();
}
function CN() {
  return C.reduce(function (t, c) {
    return t + c.q;
  }, 0);
}
function TT() {
  return C.reduce(function (t, c) {
    return t + c.p * c.q;
  }, 0);
}
function ADD(id) {
  var m = M.find(function (x) {
    return x.id === id;
  });
  var e = C.find(function (c) {
    return c.id === id;
  });
  e ? e.q++ : C.push({ id: m.id, n: m.n, p: m.p, q: 1 });
  SV();
}
function CHQ(id, d) {
  var e = C.find(function (c) {
    return c.id === id;
  });
  if (!e) return;
  e.q += d;
  if (e.q <= 0) {
    C = C.filter(function (c) {
      return c.id !== id;
    });
  }
  SV();
}
function CLR() {
  C = [];
  SV();
}
function TC() {
  document.getElementById("co").classList.toggle("open");
}
function OC() {
  TC();
  var t = TT();
  var h = '<div class="chkm"><h2>Checkout</h2><div class="csum">';
  C.forEach(function (c) {
    h +=
      '<div class="ln"><span>' +
      c.n +
      " x " +
      c.q +
      "</span><span>Rs " +
      c.p * c.q +
      "</span></div>";
  });
  h +=
    '<div class="ln bt"><span>Total</span><span>Rs ' +
    t +
    '</span></div></div><div class="fg"><label>Name</label><input id="cn" placeholder="Your name"></div><div class="fg"><label>Phone</label><input id="cp" type="tel" placeholder="+92 300 0000000"></div><div class="fg"><label>Address</label><textarea id="ca" placeholder="Delivery address"></textarea></div><button class="btn-po" onclick="PO()">Place Order - Rs ' +
    t +
    '</button><button class="btn-mb" onclick="CC()">Back</button></div>';
  document.getElementById("chko").innerHTML = h;
  document.getElementById("chko").classList.add("open");
}
function CC() {
  document.getElementById("chko").classList.remove("open");
  TC();
}
function PO() {
  var n = document.getElementById("cn").value.trim(),
    p = document.getElementById("cp").value.trim();
  if (!n || !p) {
    alert("Enter name & phone");
    return;
  }
  var oid = "ORD-" + Date.now().toString(36).toUpperCase();
  O.push({
    id: oid,
    nm: n,
    ph: p,
    addr: document.getElementById("ca").value,
    it: JSON.parse(JSON.stringify(C)),
    t: TT(),
    s: "new",
    tm: "Just now",
  });
  C = [];
  SV();
  document.getElementById("chko").innerHTML =
    '<div class="chkm"><div class="sbox"><div class="si">✓</div><h3>Order Placed!</h3><p>' +
    oid +
    '<br>We will call you shortly.</p></div><button class="btn-mb" onclick="document.getElementById(\'chko\').classList.remove(\'open\')">Close</button></div>';
}
function OA() {
  document.getElementById("ao").classList.add("open");
  RA();
}
function STA(t) {
  AT = t;
  RA();
}
function RA() {
  document.getElementById("mg").innerHTML = M.map(function (m) {
    return (
      '<div class="mcard"><img src="' +
      m.i +
      '" alt="' +
      m.n +
      '"><div class="minfo"><h4>' +
      m.n +
      '</h4><div class="md">' +
      m.d +
      '</div><div class="mfoot"><span class="mp">Rs ' +
      m.p +
      '</span><span class="mt ' +
      (m.v ? "tveg" : "tnon") +
      '">' +
      (m.v ? "Veg" : "Non-Veg") +
      '</span></div><button class="badd" onclick="ADD(' +
      m.id +
      ')">Add</button></div></div>'
    );
  }).join("");
  document.getElementById("gg").innerHTML = P.map(function (p) {
    return '<img src="' + p + '" alt="Gallery">';
  }).join("");
  var n = CN();
  document.getElementById("cbd").textContent = n;
  document.getElementById("cbd").style.display = n ? "flex" : "none";
  document.getElementById("fb").textContent = "(" + n + ")";
  document.getElementById("fb").style.display = n ? "inline" : "none";
  var t = TT();
  document.getElementById("ctv").textContent = "Rs " + t;
  var hh = C.length > 0;
  document.getElementById("cf").style.display = hh ? "block" : "none";
  document.getElementById("ci").innerHTML = hh
    ? C.map(function (c) {
        return (
          '<div class="citem"><div class="ciinfo"><div class="in">' +
          c.n +
          '</div><div class="id">Rs ' +
          c.p +
          " x " +
          c.q +
          " = Rs " +
          c.p * c.q +
          '</div></div><div class="cqty"><button onclick="CHQ(' +
          c.id +
          ',-1)">-</button><span>' +
          c.q +
          '</span><button onclick="CHQ(' +
          c.id +
          ',1)">+</button></div></div>'
        );
      }).join("")
    : '<div class="cempty">Cart is empty.</div>';
  var oh =
    '<div class="ap"><button class="apclose" onclick="document.getElementById(\'ao\').classList.remove(\'open\')">X</button><h2>Admin — ' + BIZ + '</h2><div class="atb"><button class="' +
    (AT == "orders" ? "act" : "") +
    '" onclick="STA(\'orders\')">Orders</button><button class="' +
    (AT == "menu" ? "act" : "") +
    '" onclick="STA(\'menu\')">Menu</button><button class="' +
    (AT == "stats" ? "act" : "") +
    '" onclick="STA(\'stats\')">Stats</button></div>';
  if (AT == "orders") {
    oh += O.length
      ? O.slice()
          .reverse()
          .map(function (o) {
            return (
              '<div class="orow"><span class="oid">' +
              o.id +
              '</span><span class="oc"><b>' +
              o.nm +
              "</b> · " +
              o.ph +
              " · " +
              (o.it ? o.it.length : 0) +
              ' items</span><span class="oa">Rs ' +
              o.t +
              '</span><span class="ob ' +
              (o.s == "new" ? "bnw" : o.s == "prep" ? "bpr" : "bdn") +
              '">' +
              o.s +
              "</span></div>"
            );
          })
          .join("")
      : '<p style="color:var(--t2);text-align:center;padding:40px">No orders yet</p>';
  }
  if (AT == "menu") {
    oh +=
      '<div class="menulist">' +
      M.map(function (m) {
        return (
          '<div class="mlr"><span>' +
          m.n +
          '</span><span style="color:var(--g)">Rs ' +
          m.p +
          "</span></div>"
        );
      }).join("") +
      "</div>";
  }
  if (AT == "stats") {
    var rev = O.reduce(function (t, o) {
      return t + o.t;
    }, 0);
    oh +=
      '<div class="smg"><div class="sm"><div class="sn">Rs ' +
      rev +
      '</div><div class="sl">Revenue</div></div><div class="sm"><div class="sn">' +
      O.length +
      '</div><div class="sl">Orders</div></div><div class="sm"><div class="sn">' +
      M.length +
      '</div><div class="sl">Items</div></div></div>';
  }
  oh += "</div>";
  document.getElementById("ao").innerHTML = oh;
}
RA();

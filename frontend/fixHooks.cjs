const fs = require('fs');
const files = [
    'src/hooks/useGetMyShopData.jsx',
    'src/hooks/useGetShopByCity.jsx',
    'src/hooks/useGetItemsByCity.jsx',
    'src/hooks/useGetMyOrders.jsx'
];
for(let file of files) {
    let content = fs.readFileSync(file, 'utf8');
    if(!content.includes('if (userData)')) {
        content = content.replace(/fetchShop\(\)/g, 'if (userData) fetchShop()');
        content = content.replace(/fetchOrder\(\)/g, 'if (userData) fetchOrder()');
        content = content.replace(/fetchShopByCity\(\)/g, 'if (userData && currentCity) fetchShopByCity()');
        content = content.replace(/fetchItemByCity\(\)/g, 'if (userData && currentCity) fetchItemByCity()');
        fs.writeFileSync(file, content);
    }
}
let locationHook = fs.readFileSync('src/hooks/useUpdateLocation.jsx', 'utf8');
if (!locationHook.includes('if (userData)')) {
    locationHook = locationHook.replace(/updateLocation\(pos.coords.latitude,pos.coords.longitude\)/g, 'if(userData) updateLocation(pos.coords.latitude,pos.coords.longitude)');
    fs.writeFileSync('src/hooks/useUpdateLocation.jsx', locationHook);
}
console.log('Hooks patched');

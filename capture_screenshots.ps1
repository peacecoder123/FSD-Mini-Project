$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$baseDir = "C:\Users\wankh\Downloads\FSD mini project\screenshots"

$pages = @(
    @{ Name = "01_homepage.png"; Url = "http://localhost:5173/"; Width = 1440; Height = 1080 },
    @{ Name = "02_catalog_products.png"; Url = "http://localhost:5173/shop"; Width = 1440; Height = 1080 },
    @{ Name = "03_product_details.png"; Url = "http://localhost:5173/product/6ae8bc534e01a82eea79a677"; Width = 1440; Height = 1080 },
    @{ Name = "04_search_filtering.png"; Url = "http://localhost:5173/shop?category=Electronics"; Width = 1440; Height = 1080 },
    @{ Name = "05_shopping_cart.png"; Url = "http://localhost:5173/cart"; Width = 1440; Height = 1080 },
    @{ Name = "06_checkout.png"; Url = "http://localhost:5173/checkout"; Width = 1440; Height = 1080 },
    @{ Name = "07_order_confirmation.png"; Url = "http://localhost:5173/order-confirmation/6ae8bf484e01a82eea79a6cf"; Width = 1440; Height = 1080 },
    @{ Name = "08_order_history.png"; Url = "http://localhost:5173/orders"; Width = 1440; Height = 1080 },
    @{ Name = "09_login.png"; Url = "http://localhost:5173/login"; Width = 1440; Height = 1080 },
    @{ Name = "10_registration.png"; Url = "http://localhost:5173/register"; Width = 1440; Height = 1080 },
    @{ Name = "11_admin_dashboard.png"; Url = "http://localhost:5173/admin"; Width = 1440; Height = 1080 },
    @{ Name = "12_admin_products.png"; Url = "http://localhost:5173/admin/products"; Width = 1440; Height = 1080 },
    @{ Name = "13_admin_orders.png"; Url = "http://localhost:5173/admin/orders"; Width = 1440; Height = 1080 },
    @{ Name = "14_mobile_responsive.png"; Url = "http://localhost:5173/shop"; Width = 390; Height = 844 }
)

foreach ($p in $pages) {
    $outPath = Join-Path $baseDir $p.Name
    $args = "--headless --disable-gpu --screenshot=`"$outPath`" --window-size=$($p.Width),$($p.Height) $($p.Url)"
    Start-Process -FilePath $edge -ArgumentList $args -Wait
    Start-Sleep -Milliseconds 600
    Write-Host "Captured $($p.Name) -> $(Test-Path $outPath)"
}


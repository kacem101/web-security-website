# Define the root source directory
$srcDir = "src"

Write-Host "Creating project file structure..."

# Create main src directory if it doesn't exist
New-Item -ItemType Directory -Path $srcDir -Force | Out-Null

# Create assets directories
New-Item -ItemType Directory -Path "$srcDir\assets\images", "$srcDir\assets\fonts", "$srcDir\assets\icons" -Force | Out-Null

# Create components directories
New-Item -ItemType Directory -Path "$srcDir\components\common", "$srcDir\components\homepage", "$srcDir\components\labs", "$srcDir\components\theory" -Force | Out-Null

# Create pages directory
New-Item -ItemType Directory -Path "$srcDir\pages" -Force | Out-Null

# Create styles directory
New-Item -ItemType Directory -Path "$srcDir\styles" -Force | Out-Null

# Create main application files (placeholders)
New-Item -ItemType File -Path "$srcDir\App.jsx", "$srcDir\main.jsx", "$srcDir\index.css" -Force | Out-Null
New-Item -ItemType File -Path "$srcDir\styles\tailwind.css" -Force | Out-Null

# Create placeholder component files
New-Item -ItemType File -Path "$srcDir\components\common\Button.jsx", "$srcDir\components\common\Header.jsx", "$srcDir\components\common\Layout.jsx" -Force | Out-Null
New-Item -ItemType File -Path "$srcDir\components\homepage\HeroSection.jsx", "$srcDir\components\homepage\PreviewCard.jsx", "$srcDir\components\homepage\Homepage.jsx" -Force | Out-Null
New-Item -ItemType File -Path "$srcDir\components\labs\LabList.jsx", "$srcDir\components\labs\LabPage.jsx" -Force | Out-Null
New-Item -ItemType File -Path "$srcDir\components\theory\ModuleList.jsx", "$srcDir\components\theory\TheoryPage.jsx" -Force | Out-Null

# Create placeholder page files
New-Item -ItemType File -Path "$srcDir\pages\Home.jsx", "$srcDir\pages\Theory.jsx", "$srcDir\pages\Labs.jsx" -Force | Out-Null

# UJIAN AKHIR PRAKTIKUM PWEB UNIVERSITAS GUNADARMA SEMESTER 5
KELOMPOK
1. GILBERTO PARTRICK LIE
2. MUHAMMAD FARHAN ZIDAN
3. MUHAMMAD TARMIDZI BARIQ

## DIBUTUHKAN INSTALL<br>
### 1. NODE.JS <br>
https://nodejs.org/en <br>

### 2. COMPOSER  <br>
https://getcomposer.org/

# **A. LARAVEL**
## CARA RUN PROJECT LARAVEL<br>

### 1. ARAHKAN KE DIRECTORY "laravel"
```bash
 cd laravel
```

### 2. SILAHKAN KETIK DI TERMINAL
```bash
 composer install
```

### 3. SILAHKAN BUKA XAMPP DAN HIDUPKAN APACHE DAN MYSQL
* BUAT DATABASE <br>
'ujian_akhir_praktikum_pweb'

### 4. UBAH NAMA FILE .env.example MENJADI .env <br>
* Silahkan ubah <br>
DB_DATABASE=LARAVEL <br> <br>
* Menjadi : <br>
DB_DATABASE=ujian_akhir_praktikum_pweb

### 5. ketik di termninal
```bash
php artisan migrate
```

### 6. ketik di termninal
```bash
php artisan storage:link
```

### 7. ketik di termninal
```bash
php artisan key:generate 
```

### 8. RUN PROJECT
```bash
php artisan serve
```

# **B. REACT JS + VITE**
## CARA RUN REACT JS + VITE <br>

### 1. ARAHKAN KE DIRECTORY "react-crud"
```bash
 cd react-crud
```

### 2. SILAHKAN KETIK DI TERMINAL
```bash
 npm install
```

### 3. RUN PROJECT
```bash
 npm run dev
```

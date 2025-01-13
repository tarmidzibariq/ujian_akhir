## DIBUTUHKAN INSTALL<br>
### 1. NODE.JS <br>
https://nodejs.org/en <br>
### 2. COMPOSER  <br>
https://getcomposer.org/

## CARA RUN <br>
1. SILAHKAN KETIK DI TERMINAL
```bash
 npm install
```

2. SILAHKAN KETIK DITERMINAL
```bash
php artisan key:generate 
```
3. SILAHKAN HIDUPKAN XAMPP APACHE DAN MYSQL
BUAT DATABASE <br>
'ujian_akhir_praktikum_pweb'

4. BUKA FILE .env.example <br>
Silahkan ubah <br>
DB_DATABASE=LARAVEL <br> <br>
Menjadi : <br>
DB_DATABASE=ujian_akhir_praktikum_pweb

5. ketik di termninal
```bash
php artisan migrate
```

6. RUN PROJECT
```bash
php artisan serve
```

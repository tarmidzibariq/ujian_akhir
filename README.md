## DIBUTUHKAN INSTALL<br>
1. NODE.JS
2. COMPOSER

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
BUAT DATABASE
'ujian_akhir_praktikum_pweb'

4. BUKA FILE .env.example
silahkan ubah
DB_DATABASE=LARAVEL

menjadi :
DB_DATABASE=ujian_akhir_praktikum_pweb

5. ketik di termninal
```bash
php artisan migrate
```

6. RUN PROJECT
```bash
php artisan serve
```

import { BankData } from "@/types/bank";

export const bankData: BankData = {
  materials: [
    {
      id: "material-1",
      title: "Perulangan (Loop)",
      description:
        "Memahami konsep perulangan menggunakan for dan while dalam Python.",
      content: `# Perulangan (Loop)

Perulangan digunakan untuk menjalankan blok kode secara berulang.

## 1. For Loop

Perulangan \`for\` digunakan ketika jumlah pengulangan sudah diketahui.

Contoh:

\`\`\`python
for i in range(5):
    print(i)
\`\`\`

Output:

\`\`\`
0
1
2
3
4
\`\`\`

## 2. While Loop

Perulangan \`while\` digunakan selama suatu kondisi bernilai benar.

Contoh:

\`\`\`python
i = 0

while i < 5:
    print(i)
    i += 1
\`\`\`

> Pastikan kondisi pada \`while\` dapat berubah agar tidak terjadi infinite loop.
`,
      startDate: "2026-08-01",
      status: "active",
    },

    {
      id: "material-2",
      title: "Percabangan (Conditional)",
      description:
        "Memahami penggunaan if, elif, dan else untuk membuat keputusan dalam program.",
      content: `# Percabangan

Percabangan digunakan untuk menjalankan kode berdasarkan kondisi tertentu.

## If

Contoh:

\`\`\`python
nilai = 80

if nilai >= 75:
    print("Lulus")
\`\`\`

## If Else

\`\`\`python
nilai = 60

if nilai >= 75:
    print("Lulus")
else:
    print("Tidak Lulus")
\`\`\`
`,
      startDate: "2026-08-02",
      status: "active",
    },

    {
      id: "material-3",
      title: "Fungsi (Function)",
      description:
        "Mempelajari cara membuat dan menggunakan fungsi untuk mengorganisasi kode.",
      content: `# Fungsi

Fungsi adalah blok kode yang dapat digunakan kembali untuk melakukan tugas tertentu.

Contoh:

\`\`\`python
def hitung_luas(panjang, lebar):
    return panjang * lebar

hasil = hitung_luas(10, 5)
print(hasil)
\`\`\`

Fungsi dapat menerima parameter dan mengembalikan nilai menggunakan \`return\`.
`,
      startDate: "2026-08-03",
      status: "active",
    },

    {
      id: "material-4",
      title: "Array dan List",
      description:
        "Mempelajari cara menyimpan dan mengelola kumpulan data menggunakan list.",
      content: `# Array dan List

Dalam Python, struktur data yang umum digunakan untuk menyimpan banyak nilai adalah \`list\`.

Contoh:

\`\`\`python
buah = ["apel", "mangga", "jeruk"]

print(buah[0])
\`\`\`

List dapat berisi beberapa data dan setiap elemen memiliki indeks.
`,
      startDate: "2026-08-04",
      status: "active",
    },

    {
      id: "material-5",
      title: "Dictionary",
      description:
        "Memahami struktur data dictionary untuk menyimpan data dalam bentuk key dan value.",
      content: `# Dictionary

Dictionary menyimpan data dalam pasangan \`key\` dan \`value\`.

Contoh:

\`\`\`python
siswa = {
    "nama": "Andi",
    "umur": 17,
    "kelas": "XI RPL"
}

print(siswa["nama"])
\`\`\`
`,
      startDate: "2026-08-05",
      status: "active",
    },

    {
      id: "material-6",
      title: "String",
      description:
        "Mempelajari pengolahan teks dan berbagai operasi dasar pada string.",
      content: `# String

String digunakan untuk menyimpan data berupa teks.

Contoh:

\`\`\`python
nama = "Marwa"

print(nama)
print(nama.upper())
print(nama.lower())
\`\`\`
`,
      startDate: "2026-08-06",
      status: "active",
    },

    {
      id: "material-7",
      title: "Operator Python",
      description:
        "Mempelajari operator aritmatika, perbandingan, logika, dan assignment.",
      content: `# Operator Python

Python menyediakan berbagai operator untuk melakukan operasi terhadap data.

## Operator Aritmatika

\`\`\`python
a + b
a - b
a * b
a / b
a % b
\`\`\`

## Operator Perbandingan

\`\`\`python
a == b
a != b
a > b
a < b
\`\`\`
`,
      startDate: "2026-08-07",
      status: "active",
    },

    {
      id: "material-8",
      title: "Input dan Output",
      description:
        "Mempelajari cara menerima input dari pengguna dan menampilkan output.",
      content: `# Input dan Output

Gunakan \`input()\` untuk menerima masukan dari pengguna.

Contoh:

\`\`\`python
nama = input("Masukkan nama: ")
print("Halo", nama)
\`\`\`
`,
      startDate: "2026-08-08",
      status: "inactive",
    },

    {
      id: "material-9",
      title: "Tipe Data",
      description:
        "Memahami tipe data dasar seperti integer, float, string, dan boolean.",
      content: `# Tipe Data

Beberapa tipe data dasar Python:

- \`int\`
- \`float\`
- \`str\`
- \`bool\`

Contoh:

\`\`\`python
umur = 17
tinggi = 170.5
nama = "Andi"
aktif = True
\`\`\`
`,
      startDate: "2026-08-09",
      status: "active",
    },

    {
      id: "material-10",
      title: "Error Handling",
      description:
        "Mempelajari cara menangani error menggunakan try, except, dan finally.",
      content: `# Error Handling

Error dapat ditangani menggunakan \`try\` dan \`except\`.

Contoh:

\`\`\`python
try:
    angka = int(input("Masukkan angka: "))
    print(angka)
except ValueError:
    print("Input harus berupa angka")
\`\`\`
`,
      startDate: "2026-08-10",
      status: "active",
    },

    {
      id: "material-11",
      title: "Object Oriented Programming",
      description:
        "Pengenalan konsep class, object, attribute, dan method dalam Python.",
      content: `# Object Oriented Programming

OOP merupakan paradigma pemrograman yang menggunakan object sebagai dasar penyusunan program.

Contoh:

\`\`\`python
class Siswa:
    def __init__(self, nama):
        self.nama = nama

    def belajar(self):
        print(self.nama, "sedang belajar")
\`\`\`
`,
      startDate: "2026-08-11",
      status: "active",
    },

    {
      id: "material-12",
      title: "Modul dan Package",
      description:
        "Mempelajari penggunaan modul dan package untuk mengorganisasi program.",
      content: `# Modul dan Package

Modul memungkinkan kode Python dipisahkan ke dalam beberapa file.

Contoh:

\`\`\`python
import math

print(math.sqrt(25))
\`\`\`
`,
      startDate: "2026-08-12",
      status: "inactive",
    },
  ],

  questions: [
    {
      id: "question-1",
      title: "Menghitung Bilangan dari 1 sampai N",
      description:
        "Buat program Python untuk menampilkan bilangan dari 1 sampai N menggunakan perulangan.",
      expectedOutput: "1 2 3 4 5",
      hint1: "Gunakan perulangan untuk menjalankan proses sebanyak N kali.",
      hint2: "Gunakan range() untuk membuat rentang bilangan.",
      hint3: `for i in range(1, n + 1):
    print(i)
`,
      materialId: "material-1",
      topic: { id: "material-1", title: "Perulangan (Loop)" },
      status: "active",
    },

    {
      id: "question-2",
      title: "Menjumlahkan Bilangan",
      description:
        "Buat program untuk menghitung jumlah seluruh bilangan dari 1 sampai N.",
      expectedOutput: "15",
      hint1: "Siapkan variabel untuk menyimpan total.",
      hint2: "Tambahkan setiap angka ke dalam total.",
      hint3: `total = 0

for i in range(1, n + 1):
    total += i

print(total)
`,
      materialId: "material-1",
      topic: { id: "material-1", title: "Perulangan (Loop)" },
      status: "active",
    },

    {
      id: "question-3",
      title: "Menentukan Bilangan Ganjil atau Genap",
      description:
        "Buat program yang menentukan apakah sebuah bilangan merupakan bilangan ganjil atau genap.",
      expectedOutput: "Genap",
      hint1: "Gunakan operator modulus untuk memeriksa sisa pembagian.",
      hint2: "Bilangan genap memiliki sisa 0 ketika dibagi 2.",
      hint3: `if angka % 2 == 0:
    print("Genap")
else:
    print("Ganjil")
`,
      materialId: "material-2",
      topic: { id: "material-2", title: "Percabangan (Conditional)" },
      status: "active",
    },

    {
      id: "question-4",
      title: "Menentukan Nilai Kelulusan",
      description:
        "Buat program untuk menentukan apakah siswa lulus berdasarkan nilai.",
      expectedOutput: "Lulus",
      hint1: "Gunakan kondisi untuk membandingkan nilai.",
      hint2: "Siswa dianggap lulus jika nilai minimal 75.",
      hint3: `if nilai >= 75:
    print("Lulus")
else:
    print("Tidak Lulus")
`,
      materialId: "material-2",
      topic: { id: "material-2", title: "Percabangan (Conditional)" },
      status: "active",
    },

    {
      id: "question-5",
      title: "Menghitung Luas Persegi Panjang",
      description:
        "Buat sebuah fungsi Python untuk menghitung luas persegi panjang.",
      expectedOutput: "50",
      hint1: "Luas persegi panjang diperoleh dari panjang dikali lebar.",
      hint2: "Gunakan return untuk mengembalikan hasil.",
      hint3: `def hitung_luas(panjang, lebar):
    return panjang * lebar
`,
      materialId: "material-3",
      topic: { id: "material-3", title: "Fungsi (Function)" },
      status: "active",
    },

    {
      id: "question-6",
      title: "Menghitung Nilai Rata-rata",
      description:
        "Buat fungsi untuk menghitung rata-rata dari tiga buah nilai.",
      expectedOutput: "80.0",
      hint1: "Jumlahkan seluruh nilai terlebih dahulu.",
      hint2: "Setelah dijumlahkan, bagi dengan jumlah data.",
      hint3: `def rata_rata(a, b, c):
    return (a + b + c) / 3
`,
      materialId: "material-3",
      topic: { id: "material-3", title: "Fungsi (Function)" },
      status: "active",
    },

    {
      id: "question-7",
      title: "Mencari Nilai Terbesar dalam List",
      description:
        "Buat program untuk mencari nilai terbesar dari sebuah list angka.",
      expectedOutput: "90",
      hint1: "Gunakan perulangan untuk memeriksa setiap elemen.",
      hint2: "Simpan nilai terbesar sementara dalam sebuah variabel.",
      hint3: `terbesar = angka[0]

for nilai in angka:
    if nilai > terbesar:
        terbesar = nilai

print(terbesar)
`,
      materialId: "material-4",
      topic: { id: "material-4", title: "Array dan List" },
      status: "active",
    },

    {
      id: "question-8",
      title: "Mengakses Data Dictionary",
      description:
        "Buat program untuk menampilkan nama dan kelas dari sebuah dictionary siswa.",
      expectedOutput: "Andi - XI RPL",
      hint1: "Gunakan key untuk mengambil value dari dictionary.",
      hint2: "Gunakan key nama dan kelas.",
      hint3: `print(siswa["nama"], "-", siswa["kelas"])
`,
      materialId: "material-5",
      topic: { id: "material-5", title: "Dictionary" },
      status: "active",
    },

    {
      id: "question-9",
      title: "Mengubah String Menjadi Huruf Kapital",
      description:
        "Buat program untuk mengubah sebuah teks menjadi huruf kapital.",
      expectedOutput: "HELLO WORLD",
      hint1:
        "Python memiliki method untuk mengubah string menjadi huruf kapital.",
      hint2: "Gunakan method upper().",
      hint3: `print(teks.upper())
`,
      materialId: "material-6",
      topic: { id: "material-6", title: "String" },
      status: "active",
    },

    {
      id: "question-10",
      title: "Menghitung Luas Lingkaran",
      description:
        "Buat program untuk menghitung luas lingkaran berdasarkan nilai jari-jari.",
      expectedOutput: "314.0",
      hint1: "Gunakan rumus luas lingkaran.",
      hint2: "Rumus luas lingkaran adalah π × r².",
      hint3: `import math

luas = math.pi * r ** 2
print(luas)
`,
      materialId: "material-7",
      topic: { id: "material-7", title: "Operator Python" },
      status: "active",
    },

    {
      id: "question-11",
      title: "Membaca Input Pengguna",
      description:
        "Buat program yang meminta nama pengguna kemudian menampilkan pesan sapaan.",
      expectedOutput: "Halo Andi",
      hint1: "Gunakan input() untuk menerima nama.",
      hint2: "Simpan hasil input ke dalam variabel.",
      hint3: `nama = input()
print("Halo", nama)
`,
      materialId: "material-8",
      topic: { id: "material-8", title: "Input dan Output" },
      status: "active",
    },

    {
      id: "question-12",
      title: "Menentukan Tipe Data",
      description:
        "Buat program untuk menampilkan tipe data dari sebuah variabel.",
      expectedOutput: "<class 'int'>",
      hint1: "Python menyediakan fungsi untuk mengetahui tipe data.",
      hint2: "Gunakan fungsi type().",
      hint3: `print(type(angka))
`,
      materialId: "material-9",
      topic: { id: "material-9", title: "Tipe Data" },
      status: "inactive",
    },
  ],
};

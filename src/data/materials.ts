// data dummy detail materi

export interface Material {
  id: string;
  title: string;
  description: string;
  content: {
    type: "heading" | "paragraph" | "code" | "list" | "summary";

    value: string | string[];
  }[];
}

export const materials: Material[] = [
  {
    id: "1",

    title: "Variabel dan Tipe Data",

    description:
      "Siswa mampu memahami konsep variabel serta tipe data dasar pada Python.",

    content: [
      {
        type: "heading",
        value: "Konsep Dasar",
      },

      {
        type: "paragraph",
        value:
          "Variabel adalah tempat untuk menyimpan data sehingga dapat digunakan kembali selama program dijalankan.",
      },

      {
        type: "heading",
        value: "Sintaks Dasar",
      },

      {
        type: "code",
        value: `nama = "Budi"
umur = 17
tinggi = 165.5

print(nama)`,
      },

      {
        type: "paragraph",
        value:
          "Python akan mengenali tipe data secara otomatis tanpa perlu mendeklarasikan tipenya terlebih dahulu.",
      },

      {
        type: "list",
        value: [
          "str → menyimpan teks",
          "int → bilangan bulat",
          "float → bilangan desimal",
          "bool → True atau False",
        ],
      },

      {
        type: "summary",
        value: [
          "Variabel digunakan untuk menyimpan data.",
          "Python memiliki tipe data dasar seperti string, integer, float dan boolean.",
          "Gunakan nama variabel yang mudah dipahami.",
        ],
      },
    ],
  },
  {
    id: "2",

    title: "Variabel dan Tipe Data 2",

    description:
      "Siswa mampu memahami konsep variabel serta tipe data dasar pada Python.",

    content: [
      {
        type: "heading",
        value: "Konsep Dasar",
      },

      {
        type: "paragraph",
        value:
          "Variabel adalah tempat untuk menyimpan data sehingga dapat digunakan kembali selama program dijalankan.",
      },

      {
        type: "heading",
        value: "Sintaks Dasar",
      },

      {
        type: "code",
        value: `nama = "Budi"
umur = 17
tinggi = 165.5

print(nama)`,
      },

      {
        type: "paragraph",
        value:
          "Python akan mengenali tipe data secara otomatis tanpa perlu mendeklarasikan tipenya terlebih dahulu.",
      },

      {
        type: "list",
        value: [
          "str → menyimpan teks",
          "int → bilangan bulat",
          "float → bilangan desimal",
          "bool → True atau False",
        ],
      },

      {
        type: "summary",
        value: [
          "Variabel digunakan untuk menyimpan data.",
          "Python memiliki tipe data dasar seperti string, integer, float dan boolean.",
          "Gunakan nama variabel yang mudah dipahami.",
        ],
      },
    ],
  },
];

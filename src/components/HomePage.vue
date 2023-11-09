<template>
  <form v-if="mahasiswas && mahasiswas.length">
    <h3>Daftar Mahasiswa</h3>
    <ul>
      <li v-for="mahasiswa in mahasiswas" :key="mahasiswa.id" class="data">
        Nama : {{ mahasiswa.nama }} [IPK : {{ mahasiswa.ipk }}]
      </li>
    </ul>
  </form>

  <form @submit.prevent="cariData">
    <h3>Cari Data Berdasarkan Nama </h3>
    <input type="text" required v-model="cari">

    <div class="submit">
      <button>Cari</button>
    </div>
  </form>

  <form @submit.prevent="tambahData">
    <h3>Tambah Data</h3>
    <label>Nama </label>
    <input type="nama" required v-model="namaTambah">
    <label>IPK </label>
    <input type="ipk" required v-model="ipk">
    <div class="submit">
      <button>Tambahkan</button>
    </div>
  </form>

  <form @submit.prevent="hapusData">
    <h3>Hapus Data</h3>
    <label>Nama </label>
    <input type="nama" required v-model="namaHapus">
    <div class="submit">
      <button>Hapus</button>
    </div>
  </form>

  <form @submit.prevent="editData">
    <h3>Edit Data</h3>
    <label>Nama </label>
    <input type="nama" required v-model="namaEdit">
    <label>IPK </label>
    <input type="nama" required v-model="ipkEdit">
    <div class="submit">
      <button>Edit</button>
    </div>
  </form>

</template>

<script>
export default {
  data() {
    return {
      namaEdit: '',
      ipkEdit: '',
      namaHapus: '',
      namaTambah: '',
      ipk: '',
      cari: '',
      mahasiswas: []
    }
  },
  methods: {
    tampilkanData(m) {
      this.mahasiswas = m.docs;
    },

    tampilkanSemuaData(m) {
      for (const data in m.docs) {
        console.log(m.docs[data])
        this.mahasiswas.push(m.docs[data])
      }
    },

    async cariData() {
      try {
        const resp = await fetch(`http://localhost:3000/api/mahasiswa?where[nama][equals]=${this.cari}`, {
          method: "GET",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
        })
        if (!resp.ok) {
          const errorMsg = (await resp.json())?.errors[0].message;
          throw new Error(errorMsg);
        }
        const mahasiswa = await resp.json();
        // console.log(mahasiswa)
        if (mahasiswa.docs.length > 0) {
          this.tampilkanData(mahasiswa);
        }
        else {
          alert("Nama tidak ditemukan");
        }
      }

      catch (error) {
        alert("Sign in error " + error.message);
      }
    },

    async tambahData() {
      try {
        const resp = await fetch(`http://localhost:3000/api/mahasiswa`, {
          method: "POST",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nama: this.namaTambah,
            ipk: this.ipk,
          })
        })
        if (!resp.ok) {
          const errorMsg = (await resp.json())?.errors[0].message;
          throw new Error(errorMsg);
        }
        // const mahasiswa = await resp.json();
        // console.log(mahasiswa)
        alert("Data berhasil ditambahkan");
      }

      catch (error) {
        alert("Sign in error " + error.message);
      }
    },

    async hapusData() {
      try {
        const resp = await fetch(`http://localhost:3000/api/mahasiswa?where[nama][equals]=${this.namaHapus}`, {
          method: "DELETE",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
        })
        if (!resp.ok) {
          const errorMsg = (await resp.json())?.errors[0].message;
          throw new Error(errorMsg);
        }
        // const mahasiswa = await resp.json();
        // console.log(mahasiswa)
        alert("Data berhasil dihapus");
      }

      catch (error) {
        alert("Sign in error " + error.message);
      }
    },
  }
}
</script>

<style>

form {
  max-width: 420px;
  margin: 30px auto;
  background: white;
  text-align: left;
  font-weight: bold;
  padding: 60px;
  padding-bottom: 40px;
  border-radius: 10px;
}

label {
  display: block;
  margin: 25px 0 25px;
  font-size: 0.8em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}

input {
  display: block;
  padding: 15px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
  color: #555;
}

button {
  background: #2b87ff;
  border: 0px;
  padding: 10px 20px;
  margin-top: 50px;
  color: white;
  border-radius: 20px;
}

.submit {
  text-align: center;
}

li {
  margin-left: -25px;
  font-size: 0.8em;
}

h3 {
  text-align: center;
}
</style>

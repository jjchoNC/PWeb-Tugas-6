<template>
  <nav style="text-align: right;">
    <span class="logout" @click="logout">Logout</span>
  </nav>
  <h1>Pusat Data</h1>
  <form @submit.prevent="tampilkanSemuaData">
    <h3>Daftar Mahasiswa</h3>
    <table v-if="mahasiswas && mahasiswas.length">
      <thead>
        <tr>
          <th>Nama</th>
          <th>IPK</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="mahasiswa in mahasiswas" :key="mahasiswa.id">
          <td>{{ mahasiswa.nama }}</td>
          <td>{{ mahasiswa.ipk }}</td>
        </tr>
      </tbody>
    </table>
    <div class="submit">
      <button>Tampilkan Semua Data</button>
    </div>
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
    async tampilkanSemuaData() {
      this.mahasiswas = []
      try {
        const resp = await fetch(`http://localhost:3000/api/mahasiswa`, {
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
        console.log(this.mahasiswas.indexOf(mahasiswa))
        if (mahasiswa.docs.length > 0) {
          for (const data in mahasiswa.docs) {
            console.log(mahasiswa.docs[data])
            this.mahasiswas.push(mahasiswa.docs[data])
          }
        }
        else {
          alert("Nama tidak ditemukan");
        }

      }

      catch (error) {
        alert(error.message);
        this.$router.replace('/sign-in');
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
        console.log(this.mahasiswas.indexOf(mahasiswa))
        if (mahasiswa.docs.length > 0) {
          this.mahasiswas = mahasiswa.docs;
        }
        else {
          alert("Nama tidak ditemukan");
        }

      }

      catch (error) {
        alert(error.message);
        this.$router.replace('/home');
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
        alert(error.message);
        this.$router.replace('/home');
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
        alert("Data berhasil dihapus");
      }

      catch (error) {
        alert(error.message);
        this.$router.replace('/home');
      }
      this.tampilkanSemuaData();
    },

    async editData() {
      try {
        const resp = await fetch(`http://localhost:3000/api/mahasiswa?where[nama][equals]=${this.namaEdit}`, {
          method: "PATCH",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nama: this.namaEdit,
            ipk: this.ipkEdit,
          })
        })
        if (!resp.ok) {
          const errorMsg = (await resp.json())?.errors[0].message;
          throw new Error(errorMsg);
        }
        // const mahasiswa = await resp.json();
        // console.log(mahasiswa)
        alert("Data berhasil diedit");
        this.tampilkanSemuaData();
      }

      catch (error) {
        alert(error.message);
        this.$router.replace('/home');
      }
    },

    async logout() {
      try {
        const resp = await fetch(`http://localhost:3000/api/users/logout`, {
          method: "POST",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nama: '',
            email: '',
          })
        })
        if (!resp.ok) {
          const errorMsg = (await resp.json())?.errors[0].message;
          throw new Error(errorMsg);
        }
        // const mahasiswa = await resp.json();
        // console.log(mahasiswa)
        this.$router.replace('/sign-in')
      }

      catch (error) {
        alert(error.message);
        this.$router.replace('/home');
      }
    }
  }
}
</script>

<style>
form {
  width: 100%;
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
  cursor: pointer;
}

.submit {
  text-align: center;
}

h5 {
  text-align: center;
}

h3 {
  text-align: center;
}

table {
  margin: 0 auto;
  border-collapse: collapse;
  width: 80%;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

th {
  background-color: #f2f2f2;
}

tbody {
  text-align: center;
}

nav {
  background: #2b87ff;
  text-align: right;
  padding: 10px;
  color: white;
  font-weight: bold;
}

.logout{
  cursor: pointer;
}
</style>

<template>
  <form>
    <label>Daftar Mahasiswa</label>
    <ul>
      <li v-for="mahasiswa in mahasiswas" :key="mahasiswa.id" class="data">
        Nama : {{ mahasiswa.nama }} [IPK : {{ mahasiswa.ipk }}]
      </li>
    </ul>
  </form>

  <form @submit.prevent="cariData">
    <label>Cari Data Berdasarkan Nama </label>
    <input type="text" required v-model="cari">

    <div class="submit">
      <button>Cari</button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      cari: '',
      mahasiswas: []
    }
  },
  methods: {
    tampilkanData(m) {
      this.mahasiswas = m.docs;
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
        console.log(mahasiswa)
        this.tampilkanData(mahasiswa);
      }

      catch (error) {
        alert("Sign in error " + error.message);
      }
    }
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
  display: inline-block;
  margin: 25px 0 25px;
  font-size: 1em;
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

li{
  color: #aaa;
  margin-left: -25px;
}
</style>

<template>
  <form @submit.prevent="submit">
    <label>Email </label>
    <input type="email" required v-model="email">

    <label>Password </label>
    <input type="password" required v-model="password">

    <div class="submit">
      <button>Submit</button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async submit() {
      try {
        const resp = await fetch("http://localhost:3000/api/users/login", {
          method: "POST",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        })
        if (!resp.ok) {
          const errorMsg = (await resp.json())?.errors[0].message;
          throw new Error(errorMsg);
        }
        const user = await resp.json();
        console.log(user.message)
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
  color: #aaa;
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
</style>

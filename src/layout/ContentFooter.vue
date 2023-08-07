<template>
  <footer class="footer">
    <div class="container-fluid">
      <nav>
        <ul class="footer-menu">
          <li>
            <router-link :to="{ path: '/admin' }">Painel Inicial</router-link>
          </li>
        </ul>
      </nav>
      <div class="copyright text-center">&copy; TALLOS</div>
    </div>
  </footer>
</template>
<script>
export default {};
</script>
<style></style>

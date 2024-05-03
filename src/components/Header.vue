<template>
    <header class="bg-gray-800 py-4 text-white">
      <div class="container mx-auto flex items-center justify-between">
        <div class="flex items-center">
          <img  alt="Logo" class="mr-4 h-8" />
        </div>
        <!-- Burger menu icon -->
        <button id="burger-menu" class="focus:outline-none md:hidden">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
        <!-- Hidden menu items -->
        <nav id="menu" class="hidden md:flex md:items-center">
          <ul class="flex space-x-4">
            <li><a href="#" class="hover:text-gray-300">Home</a></li>
            <li><a href="#" class="hover:text-gray-300">About</a></li>
            <li><a href="#" class="hover:text-gray-300">Services</a></li>
            <li><a href="#" class="hover:text-gray-300">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
</template>
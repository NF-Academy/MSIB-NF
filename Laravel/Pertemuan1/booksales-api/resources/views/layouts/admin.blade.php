<!DOCTYPE html>
<html>
<head>
    <title>Admin Panel</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <nav class="navbar navbar-dark bg-dark px-4 mb-4">
        <a class="navbar-brand" href="#">Admin</a>
        <div class="navbar-nav">
            <a class="nav-link" href="{{ route('admin.authors.index') }}">Author</a>
            <a class="nav-link" href="{{ route('admin.genres.index') }}">Genre</a>
        </div>
    </nav>

    <main class="container">
        @yield('content')
    </main>
</body>
</html>

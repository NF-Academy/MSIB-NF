@extends('layouts.admin')

@section('content')
<div class="container mt-4">
    <h2>Kelola Author</h2>

    @if(session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif

    {{-- Form Tambah --}}
    <form method="POST" action="{{ route('admin.authors.store') }}" class="mb-3">
        @csrf
        <div class="input-group">
            <input type="text" name="name" class="form-control" placeholder="Nama Author" required>
            <button type="submit" class="btn btn-primary">Tambah</button>
        </div>
    </form>

    {{-- Tabel --}}
    <table class="table table-bordered">
        <thead>
            <tr>
                <th>ID</th><th>Nama</th>
            </tr>
        </thead>
        <tbody>
            @foreach($authors as $author)
                <tr>
                    <td>{{ $author->id }}</td><td>{{ $author->name }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    {{ $authors->links() }}
</div>
@endsection

@extends('layouts.admin')

@section('content')
<div class="container mt-4">
    <h2>Kelola Genre</h2>

    @if(session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif

    {{-- Form Tambah --}}
    <form method="POST" action="{{ route('admin.genres.store') }}" class="mb-3">
        @csrf
        <div class="input-group">
            <input type="text" name="name" class="form-control" placeholder="Nama Genre" required>
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
            @foreach($genres as $genre)
                <tr>
                    <td>{{ $genre->id }}</td><td>{{ $genre->name }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    {{ $genres->links() }}
</div>
@endsection

<!DOCTYPE html>
<html>
<head>
    <title>Form Penilaian</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>

<div class="container">
    <h2>Form Penilaian Ujian</h2>

    <form method="post" action="">
        <label>Nama:</label>
        <input type="text" name="nama" required>

        <label>Email:</label>
        <input type="email" name="email" required>

        <label>Nilai Ujian:</label>
        <input type="number" name="nilai" required>

        <input type="submit" name="submit" value="Kirim">
    </form>

    <?php
    if (isset($_POST['submit'])) {
        $nama = $_POST['nama'];
        $email = $_POST['email'];
        $nilai = $_POST['nilai'];

        echo "<div class='hasil'>";
        echo "<h3>Hasil Evaluasi</h3>";
        echo "Nama: <strong>$nama</strong><br>";
        echo "Email: <strong>$email</strong><br>";
        echo "Nilai Ujian: <strong>$nilai</strong><br>";

        if ($nilai > 70) {
            echo "<p class='lulus'>Status: Lulus ✅</p>";
        } else {
            echo "<p class='remedial'>Status: Remedial ❌</p>";
        }
        echo "</div>";
    }
    ?>
</div>

</body>
</html>

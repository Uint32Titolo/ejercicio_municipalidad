<?php 
    include('database.php');

    
    
    $dv = substr($_POST['run'], -1);
    $run = rtrim($_POST['run'], $dv);
    $run= str_replace('-','',$run);
    $run= str_replace('.','',$run);
   
    // $sql = "INSERT INTO `votacion`(`nombreApellido`, `alias`, `email`, `region`, `comuna`) VALUES ('$nombre','$_POST[alias]','$run','$_POST[email]','$_POST[regiones]','$_POST[comunas]')";


?>
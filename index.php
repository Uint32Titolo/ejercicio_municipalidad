<?php 
    include('database.php');
    include('includes/header.php');?>


    <div class="row">



        <div class="col-7">
            <div class="card">

            </div>
            <div class="card-body">
                <h2>Formulario de Votación</h2>
                <form name="form1" id="form1" method="post" action="">

                <div class="form-group row">
                    <label for="nombre" class="col-sm-2 col-form-label">Nombre y Apellido</label>
                    <div class="col-sm-6">
                        <input type="text" name="nombre" id="nombre" class="form-control" onblur="descripEmpty(id)">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="Alias" class="col-sm-2 col-form-label">Alias</label>
                    <div class="col-sm-6">
                        <input type="text" name="alias" class="form-control" id="alias" onblur="validarAlias(id)">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="run" class="col-sm-2 col-form-label">Run</label>
                    <div class="col-sm-6">
                        <input type="text" name="run" id="run" class="form-control" onblur="validarRut(id)">
                    </div>
                </div>                
                <div class="form-group row">
                    <label for="email " class="col-sm-2 col-form-label">Email</label>
                    <div class="col-sm-6">
                        <input type="text" name="email" class="form-control" id="email" onblur="revisarEmail(id)">
                    </div>
                </div>        
                <div class="form-group row">
                    <label for="region" class="col-sm-2 col-form-label">Región</label>
                    <div class="col-sm-6">
                    <select class="custom-select" id="regiones" name="regiones" onblur="validarSelectRegion(id)">

                    </select>

                    </div>
                </div> 

                <div class="form-group row">
                    <label for="comuna" class="col-sm-2 col-form-label">Comuna</label>
                    
                    <div class="col-sm-6">
                        <select class="custom-select" name="comunas" id="comunas" onblur="validarSelectComuna(id)">

                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="candidato" class="col-sm-2 col-form-label">Candidato</label>
                    

                    <div class="col-sm-6">
                        <select class="custom-select" id="candidato">
                            <option value="0">Seleccione una opción</option>
                        <?php   
                        $candidatos = ' SELECT *
                                        FROM candidatos';
                        $resultado = mysqli_query($conexion, $candidatos);

                        foreach ($resultado as $opciones) {
                        

                        ?>
                        <option value="<?php echo $opciones['idCandidato']; ?>"><?php echo $opciones['nombreApellido']; ?></option>
                        <?php 
                        }
                        ?>
                        </select>
                    </div>
                </div>
                    
                    
                    <fieldset class="form-group row">
                        <legend class="col-form-label col-sm-2 float-sm-left pt-0">Cómo se enteró de nosotros</legend>
                        <div class="col-sm-6">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="web">
                            <label class="form-check-label" for="1">
                            Web
                            </label>
                        </div>

                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="tv">
                            <label class="form-check-label" for="2">
                            TV
                            </label>
                        </div>
                        

                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="rrss" >
                            <label class="form-check-label" for="3">
                            Redes Sociales
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="amigo">
                            <label class="form-check-label" for="4">
                            Amigo
                            </label>
                        </div>


                    </fieldset>
                <!-- </div> -->

                
                    <button type="button" class="btn btn-primary" onclick="validarVotacion()">Votar</button>
                </form>
            </div>
           
        </div>

    </div>

<?php 
    include('includes/footer.php');
?>
	<script src="js/funciones.js"></script>
    <script>
    $( document ).ready(function() {
        var countCheck = 0;
    });
</script>
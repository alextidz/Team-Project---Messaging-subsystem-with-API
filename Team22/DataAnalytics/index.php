<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php
    echo '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>';
?>
    <script>
        <?php session_start();

    
    if ((!isset($_SESSION['userID'])) || (!isset($_SESSION['userType']))) {
        header("Location: ../sign in.php");
        session_destroy();
        exit();
    }
    if (isset($_POST['time'])) {
        $_SESSION['time'] = $_POST['time'];
    }

        $role = $_SESSION['userType'];
        ?>

        function updateContent(action) {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", window.location.href, true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    document.getElementById("content").innerHTML = xhr.responseText;
                    loadScriptForAction(action); // Load script after updating content
                    resetHTMLLangAttribute();
                }
            };
            xhr.send("action=" + action);
        }

        function loadScript(url) {
            var script = document.createElement('script');
            script.src = url;
            document.head.appendChild(script);
        }

        function loadScriptForAction(action) {
            switch (action) {
                case 'data':
                    loadScript('./js/dashboard.js');
                    break;
                case 'activity':
                    loadScript('./js/activityDashboard.js');
                    break;
                case 'postsNtopics':
                    loadScript('./js/postsNtopics.js');
                    break;
                default:
                    break;
            }
        }

        function resetHTMLLangAttribute() {
            document.documentElement.lang = "en";
        }


    function searchBar() {
        // Get current POST variables
		var searchInput = document.getElementById('searchFilter');
        var formData = new FormData();
        var searchFilter = searchInput.value.trim();

        // Add new search filter variable
        formData.append('searchFilter', searchFilter);

        // Create and submit new form with both sets of variables
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'index.php', true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                // Handle response
                document.getElementById('content').innerHTML = xhr.responseText;
            } else {
                // Handle error
                console.error('Request failed. Error code: ' + xhr.status);
            }
        };
        xhr.send(formData);
    }
	function searchBarE() {
        // Get current POST variables
		var searchInput = document.getElementById('searchFilterE');
        var formData = new FormData();
        var searchFilterE = searchInput.value.trim();

        // Add new search filter variable
        formData.append('searchFilterE', searchFilterE);

        // Create and submit new form with both sets of variables
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'index.php', true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                // Handle response
                document.getElementById('content').innerHTML = xhr.responseText;
            } else {
                // Handle error
                console.error('Request failed. Error code: ' + xhr.status);
            }
        };
        xhr.send(formData);
    }
    </script>
</head>
<body>
<div id="content">
    <?php
	if (isset($_POST['searchFilter'])) {
        if (isset($_POST['empNumber'])) {
            unset($_POST['empNumber']);
        }
		if (isset($_POST['teamNumber'])) {
            unset($_POST['teamNumber']);
        }
        if ($role == "TL") {
            include 'TLteams.php';
        } else if ($role == "User") {
            echo "<script>window.location.href='../sign in.php'</script>";

        } else if ($role == "Manager") {
            include 'teams.php';
        }
        //check role
		
    }else if (isset($_POST['searchFilterE'])) {
        if (isset($_POST['empNumber'])) {
            unset($_POST['empNumber']);
        }
		if (isset($_POST['teamNumber'])) {
            unset($_POST['teamNumber']);
        }
        if ($role == "TL") {
            echo "<script>window.location.href='../sign in.php'</script>";
        } else if ($role == "User") {
            echo "<script>window.location.href='../sign in.php'</script>";
        } else if ($role == "Manager") {
            include 'individual.php';
        }
    }

    else if (isset($_POST['teamNumber'])) {
        if (isset($_POST['empNumber'])) {
            unset($_POST['empNumber']);
        }
        if ($role == "TL") {
            include 'TLindividualTeam.php';

        } else if ($role == "User") {
            echo "<script>window.location.href='../sign in.php'</script>";
        } else if ($role == "Manager") {
            include 'individualTeam.php';
        }
        //check role
    } else if (isset($_POST['empNumber'])) {
        if (isset($_POST['teamNumber'])) {
            unset($_POST['teamNumber']);
        }
        //check role
        if ($role == "TL") {
            echo "<script>window.location.href='../sign in.php'</script>";
        } else if ($role == "User") {
            echo "<script>window.location.href='../sign in.php'</script>";
        } else if ($role == "Manager") {
            include 'individualEmp.php';
        }
        include 'individualEmp.php';
    } else if (isset($_POST['action'])) {
        $action = $_POST['action'];
        switch ($action) {
            case 'data':
				if (isset($_POST['teamNumber'])) {
					unset($_POST['teamNumber']);
				}
				if (isset($_POST['empNumber'])) {
					unset($_POST['empNumber']);
				}
                if ($role == "TL") {
                    echo "<script>window.location.href='../sign in.php'</script>";
                } else if ($role == "User") {
                    echo "<script>window.location.href='../sign in.php'</script>";
                } else if ($role == "Manager") {
                    include 'data.php';
                }
                break;
            case 'teams':
				if (isset($_POST['teamNumber'])) {
					unset($_POST['teamNumber']);
				}
				if (isset($_POST['empNumber'])) {
					unset($_POST['empNumber']);
				}

                if ($role === "TL") {
                    include 'TLteams.php';    
                } else if ($role == "User") {
                    echo "<script>window.location.href='../sign in.php'</script>";
                } else if ($role == "Manager") {
                    include 'teams.php';
                }
                break;
            case 'postsNtopics':
				if (isset($_POST['teamNumber'])) {
					unset($_POST['teamNumber']);
				}
				if (isset($_POST['empNumber'])) {
					unset($_POST['empNumber']);
				}

                if ($role === "TL") {
                    echo "<script>window.location.href='../sign in.php'</script>";
                } else if ($role == "User") {
                    echo "<script>window.location.href='../sign in.php'</script>";
                } else if ($role == "Manager") {
                    include 'postsNtopics.php';
                }
                break;
            case 'individual':
				if (isset($_POST['teamNumber'])) {
					unset($_POST['teamNumber']);
				}
				if (isset($_POST['empNumber'])) {
					unset($_POST['empNumber']);
				}

                if ($role === "TL") {
                    include 'TLindividualEmp.php';
                } else if ($role == "User") {
                    include 'EMPindividualEmp.php';

                } else if ($role == "Manager") {
                    include 'individual.php';

                }
                break;
            default:
                echo "<p>Invalid action!</p>";
                break;
        }
    } else {
        if ($role === "TL") {
            if(!isset($_SESSION['time'])){
                $_SESSION['time'] = "active";
            }
            include 'TLindividualEmp.php';
        } else if ($role == "User") {
            if(!isset($_SESSION['time'])){
                $_SESSION['time'] = "active";
            }
            include 'EMPindividualEmp.php';
        } else if ($role == "Manager") {
            if(!isset($_SESSION['time'])){
                $_SESSION['time'] = "active";
            }
            if(isset($_POST['page'])){
                $page =  $_POST['page'] . ".php";
                include $page;
            }else{
                include 'data.php';
            }
            
        }
    }
	
	if (isset($_POST['teamNumber'])) {
		unset($_POST['teamNumber']);
	}
	if (isset($_POST['empNumber'])) {
		unset($_POST['empNumber']);
	}
    ?>
</div>
</body>
</html>

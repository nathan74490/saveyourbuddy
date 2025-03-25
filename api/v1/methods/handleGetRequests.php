<?php

function handleGetRequests()
{
    global $conn;
    if (isset($_GET['help'])) {
        $api_docs = array(
            'endpoints' => array(
                'GET api/v1/index.php?games' => 'Retoune la listes des jeux',
                'GET api/v1/index.php?help' => 'Retourne la liste des endpoints',
                'GET api/v1/index.php?game={id_game}&module={module_number}' => 'Retourne les informations du module d\'un jeu',
                'GET api/v1/index.php?game={id_game}&mindgame={mindgame_number}' => 'Retourne les informations du mindgame d\'un jeu',
                'POST api/v1/index.php' => 'Create new game/module/mindgame',
                'PUT api/v1/index.php' => 'Update existing game/module/mindgame'
            )
        );
        header('Content-Type: application/json');
        echo json_encode($api_docs);
    } elseif (isset($_GET['games'])) {
        $sql = "SELECT * FROM game";
        $result = mysqli_query($conn, $sql);

        $games = array();
        while ($gameData = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
            $games[] = $gameData;
        }

        header('Content-Type: application/json');
        echo json_encode($games);
    } elseif (isset($_GET['teams'])) {
        $sql = "SELECT * FROM team";
        $result = mysqli_query($conn, $sql);

        $teams = array();
        while ($teamData = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
            $teams[] = $teamData;
        }

        header('Content-Type: application/json');
        echo json_encode($teams);
    } elseif (isset($_GET['team'])) {
        $team_id = mysqli_real_escape_string($conn, $_GET['team']);
        
        $sql = "SELECT * FROM team WHERE id_team = '$team_id'";
        $result = mysqli_query($conn, $sql);

        $team = mysqli_fetch_array($result, MYSQLI_ASSOC);

        header('Content-Type: application/json');
        echo json_encode($team);

    } elseif (isset($_GET['game']) && !isset($_GET['module']) && !isset($_GET['mindgame'])) {
        $game_id = mysqli_real_escape_string($conn, $_GET['game']);
        
        // Get game info
        $sql = "SELECT g.* FROM game g WHERE g.id_game = '$game_id'";
        $result = mysqli_query($conn, $sql);
        $game = mysqli_fetch_array($result, MYSQLI_ASSOC);

        // Get modules
        $sql = "SELECT module_number, module_status FROM module WHERE id_game = '$game_id'";
        $result = mysqli_query($conn, $sql);
        $modules = [];
        while ($module = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
            $modules[] = $module;
        }
        
        // Get mindgames
        $sql = "SELECT mindgame_number, mindgame_status FROM mindgame WHERE id_game = '$game_id'";
        $result = mysqli_query($conn, $sql);
        $mindgames = [];
        while ($mindgame = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
            $mindgames[] = $mindgame;
        }

        // Combine all data
        $game['modules'] = $modules;
        $game['mindgames'] = $mindgames;

        header('Content-Type: application/json');
        echo json_encode($game);

    } elseif (isset($_GET['game']) && isset($_GET['module'])) {
        $game_id = mysqli_real_escape_string($conn, $_GET['game']);
        $module_number = mysqli_real_escape_string($conn, $_GET['module']);

        $sql = "SELECT * FROM module WHERE id_game = '$game_id' AND module_number = '$module_number'";
        $result = mysqli_query($conn, $sql);

        $module = mysqli_fetch_array($result, MYSQLI_ASSOC);

        header('Content-Type: application/json');
        echo json_encode($module);
    } elseif (isset($_GET['game']) && isset($_GET['mindgame'])) {
        $game_id = mysqli_real_escape_string($conn, $_GET['game']);
        $mindgame_number = mysqli_real_escape_string($conn, $_GET['mindgame']);

        $sql = "SELECT * FROM mindgame WHERE id_game = '$game_id' AND mindgame_number = '$mindgame_number'";
        $result = mysqli_query($conn, $sql);

        $mindgame = mysqli_fetch_array($result, MYSQLI_ASSOC);

        header('Content-Type: application/json');
        echo json_encode($mindgame);
    } else {
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Invalid endpoint']);
    }
}

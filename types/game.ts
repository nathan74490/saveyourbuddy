import Team from "./team";

export default interface Game {
    id_game: number;
    game_status: string;
    game_time: string;
    FinalTime: string;
    duration: number;
    pause_start_time: string;
    teams: Team[] | string[]; // Could be either array of Team objects or team names
    mindgames: {
        id_mindgame: number;
        mindgame_number: number;
        mindgame_status: string;
        id_game: number;
      }[];
      modules: {
        id_module: number;
        module_number: number;
        module_status: string;
        id_game: number;
      }[];
  }
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GameService } from '../game.service';
import { MessageService } from '../message.service';
import { Player } from '../player';
import { Game } from '../game';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm;
  serverAnswer: string;
  player: Player;
  scoringLimit: number;
  game: Game;

  constructor(
    private formBuilder: FormBuilder,
    private gameService: GameService,
    private messageService: MessageService
  ) {
    this.loginForm = this.formBuilder.group({
      pseudo: '',
      team: '',
      scoringLimit: '',
    });
  }

  ngOnInit(): void {
    this.player = { pseudo: '', team: 0 };
  }

  onSubmit(playerData): void {
    this.player.pseudo = playerData.pseudo;
    this.player.team = playerData.team;
    this.scoringLimit = playerData.scoringLimit;

    // this.loginForm.reset();

    console.warn('You have created a new game', playerData);
    this.messageService.addMessage('Login component : creating a new game');
    this.createNewGame(this.player, this.scoringLimit);
    this.getTestResponse();
  }

  getTestResponse(): void {
    this.gameService.test().subscribe((answer) => (this.serverAnswer = answer));
  }

  createNewGame(player: Player, scoringLimit: number): void {
    this.gameService
      .createNewGame(player, scoringLimit)
      .subscribe((game) => (this.game = game));
  }
}

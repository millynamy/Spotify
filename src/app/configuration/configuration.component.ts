import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { GameService } from '../game.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  gameMode: string = 'single';    // Default value
  difficulty: string = 'easy';    // Default value
  selectBy: string = 'artist';   // Default value
  
  configForm = new FormGroup({
    gameMode: new FormControl('gameMode'),
    difficulty: new FormControl('difficulty'),
    selectBy: new FormControl('selectBy'),
  });
  constructor(private router: Router, private gameService: GameService) {}

  ngOnInit(): void {
    const savedConfig = JSON.parse(localStorage.getItem('gameConfig') || '{}');
    if (savedConfig) {
      this.gameMode = savedConfig.gameMode;
      this.difficulty = savedConfig.difficulty;
      this.selectBy = savedConfig.selectBy;
    }
     
  }
    saveConfiguration(): void {
      // Save the form values to localStorage
      
      let config = { 
        gameMode: this.configForm.get('gameMode'), 
        difficulty: this.configForm.get('difficulty'), 
        selectBy: this.configForm.get('selectBy')
      };

      console.log(this.configForm.value);
      if(this.configForm.value.gameMode && this.configForm.value.difficulty && this.configForm.value.selectBy){
        this.gameService.setConfigResults(
          this.configForm.value.gameMode,
          this.configForm.value.difficulty,
          this.configForm.value.selectBy
        )
        console.log(this.configForm.value.gameMode);
      }else{        
        this.gameService.setConfigResults(
        this.gameMode,
        this.difficulty,
        this.selectBy)
      }
      alert('Configuration Saved!');
      this.router.navigate(['/game']);
}
}
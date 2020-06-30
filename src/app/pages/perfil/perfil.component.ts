import { Component, OnInit, ViewChild } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario: string;
  roles: string[];
  displayedColumns: string[] = ['nombreRol'];
  dataSource: MatTableDataSource<string>;
  @ViewChild(MatSort) sort: MatSort;

  constructor() { }

  ngOnInit(): void {

    const helper = new JwtHelperService();
    let token = sessionStorage.getItem(environment.TOKEN_NAME);

    const decodedToken = helper.decodeToken(token);
    this.usuario = decodedToken.user_name;
    this.roles = decodedToken.authorities;
    this.dataSource = new MatTableDataSource(this.roles);
    this.dataSource.sort = this.sort;
  }

}

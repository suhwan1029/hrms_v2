import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  ngAfterViewInit() {
    this.loadCharts();
  }

  loadCharts() {
    const attendanceCanvas = document.getElementById("attendanceChart") as HTMLCanvasElement;
    const salaryCanvas = document.getElementById("salaryChart") as HTMLCanvasElement;

    if (attendanceCanvas) {
      new Chart(attendanceCanvas, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
          datasets: [{
            label: 'Attendance (%)',
            data: [95, 92, 88, 90, 96],
            backgroundColor: ['#007bff']
          }]
        }
      });
    }

    if (salaryCanvas) {
      new Chart(salaryCanvas, {
        type: 'pie',
        data: {
          labels: ['Basic', 'HRA', 'Bonus', 'Deductions'],
          datasets: [{
            label: 'Salary Breakdown',
            data: [50000, 20000, 10000, 5000],
            backgroundColor: ['#007bff', '#28a745', '#ffc107', '#dc3545']
          }]
        }
      });
    }
  }
}

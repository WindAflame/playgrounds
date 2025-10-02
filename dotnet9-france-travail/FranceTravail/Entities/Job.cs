using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FranceTravail.Entities
{
    /// <summary>
    /// Definition of a job in our application.
    /// </summary>
    public class Job
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string? Description { get; set; }
        public string? UrlPostulation { get; set; }
        public string? LieuDeTravail { get; set; }
        public string? TypeContrat { get; set; }
        public string? EntrepriseNom { get; set; }
        // What ?
        // System reference not work ...
        //public string PaysContinent { get; set; }

    }
}

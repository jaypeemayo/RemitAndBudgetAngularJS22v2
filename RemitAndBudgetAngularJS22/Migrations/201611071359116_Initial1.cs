namespace RemitAndBudgetAngularJS22.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.TransactionInfoes", "UserId", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.TransactionInfoes", "UserId");
        }
    }
}

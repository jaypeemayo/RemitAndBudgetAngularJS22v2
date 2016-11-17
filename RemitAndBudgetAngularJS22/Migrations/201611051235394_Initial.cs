namespace RemitAndBudgetAngularJS22.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.TransactionInfoes",
                c => new
                    {
                        TransactionInfoId = c.Int(nullable: false, identity: true),
                        Amount = c.String(),
                        Month = c.DateTime(nullable: false),
                        Description = c.String(),
                        Action = c.String(),
                        UserInfoId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.TransactionInfoId)
                .ForeignKey("dbo.UserInfoes", t => t.UserInfoId, cascadeDelete: true)
                .Index(t => t.UserInfoId);
            
            CreateTable(
                "dbo.UserInfoes",
                c => new
                    {
                        UserInfoId = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Password = c.String(),
                        UserType = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.UserInfoId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.TransactionInfoes", "UserInfoId", "dbo.UserInfoes");
            DropIndex("dbo.TransactionInfoes", new[] { "UserInfoId" });
            DropTable("dbo.UserInfoes");
            DropTable("dbo.TransactionInfoes");
        }
    }
}
